import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import CancelIcon from "@material-ui/icons/Cancel";
import { Modal} from "react-bootstrap";
import Button from '@material-ui/core/Button'
import { createTheme,ThemeProvider } from '@material-ui/core/styles';
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(1),
  },
  absolute: {
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));
const theme = createTheme({
  palette: {
    primary:{
      main: '#115293',
    },
  },
});


const EmailSend = () => {
  const classes = useStyles();
  const [userEmail, setUserEmail] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [emailValue, setEmailvalue] = useState({
    message: "",
    sub: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const onSubmit = (data, e) => {
    if (userEmail.length <= 1 && !userEmail[0].email) {
      return window.alert("Plz Select At Least One Valid Email");
    }
    let str = "",coma=",";
    const res = userEmail.map((user,index) => {
      if (user.email) {
        str=str.concat(user.email);

      }
      if(index!==userEmail.length-1) {
        str=str.concat(coma)
      }
    });

    axios
      .post("http://localhost:5000/sendEmail", {
        message: data.message,
        subject: data.sub,
        userEmail: str,
      })
      .then(() => {
        window.alert("Message Sent ");
        setUserEmail([]);
        e.target.reset();
      });
  };
  const sendToEmail = (value) => {
    setShow(true);
  };
  const handleChange = (e) => {
    console.log("sdf", e.target.value);
    setEmail(e.target.value);
  };
  const ActionEmail = () => {
    let isEmailValid = true;
    isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (isEmailValid) {
      console.log("sg", email);
      var ID = Math.floor(Math.random() * 100) + 1000;
      console.log("dfg", email, "ID", ID);
      setUserEmail([
        ...userEmail,
        {
          id: ID,
          email: email,
          checked: true,
        },
      ]);
      setShow(false);
    } else {
      return window.alert("PLz Type valid Email ");
    }
  };
  const removeEmail = (id, email) => {
    console.log("Remove Email", id, email);

    var res = userEmail.filter((user, index) => {
      return id !== user.id;
    });
    var obj2 = {
      id: id,
      email: email,
      checked: false,
    };
    console.log("res", res);
    setUserEmail([...res, obj2]);
  };
  console.log("userEmail", userEmail);
  return (
    <div>
      <section className="sectionx">
        <div class="containerx">
          <div class="forwarp">
            <label className="text-right">To</label>
            <div className="d-flex">
              <div className="inputEmail">
                {userEmail.map((e) => (
                  <>
                    {e.checked && (
                      <span>
                        {e.email}
                        {e.email && (
                          <span
                            onClick={() => removeEmail(e.id, e.email)}
                            className="p-1 text-danger rounded-circle inputEmailRemove"
                          >
                            <strong>x</strong>
                          </span>
                        )}
                      </span>
                    )}
                  </>
                ))}
              </div>
              <div>
                <Tooltip
                  onClick={sendToEmail}
                  style={{ height: "20px", width: "30px" }}
                  title="Add"
                  aria-label="add"
                >
                  <Fab color="secondary" className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </div>
            </div>
          </div>
          <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <label>Subject</label>

              <input
                type="text"
                name="sub"
                defaultValue={emailValue.sub}
                {...register("sub", { required: true })}
              />
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                defaultValue={emailValue.message}
                {...register("message", { required: true })}
              ></textarea>
            </div>
            
            <ThemeProvider theme={theme}>
        <Button 
            type="submit" variant="contained" color="primary"  className="buttonEmail">
        Submit
        </Button>
      </ThemeProvider>
          </form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton={true}>
              <Modal.Title>User Email </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form id="my-form2">
                <div class="form-group">
                  <label>Email</label>

                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email Adreess"
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <h6 className="text-danger">Are you sure add to email</h6>
              <Button onClick={handleClose}  variant="contained" color="secondary">
                Cancel
              </Button>
              <Button className="m-2"onClick={ActionEmail} variant="contained" color="primary">
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div id="status"></div>
      </section>
    </div>
  );
};

export default EmailSend;
