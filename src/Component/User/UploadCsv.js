import React, { useRef, useState, useEffect, useCallback } from "react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import csv from "csv";
import Button from '@material-ui/core/Button';
import axios from "axios";
import { SiGmail } from "react-icons/si";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#115293',
    borderRadius:'10px',
    
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UploadCsv = (props) => {
  const [csvEmployeelen, setCsvEmployeelen] = useState(0);
  const [csvEmployeelenFailed, setCsvEmployeelenFailed] = useState(0);
  const [csvEmployeeData, setCsvEmployeeData] = useState([[{}]]);
  const [show, setShow] = useState(false);

  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    // if  there are any errors a

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      // Parse CSV file
      csv.parse(reader.result, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Parsed CSV data: ", data);
          setCsvEmployeeData(data);
          let tota = 0,
            uncount = 0;
          data.forEach((val, index) => {
            console.log(val);
            if (index > 0 && val.length >= 3) {
              let cnt = 0;

              for (let i = 0; i <= 2; i++) {
                console.log("sf", val[i]);
                if (val[i] !== "" || val[i] !== " " || val[i].empty()) {
                  cnt++;
                }
              }

              if (cnt === 3) {
                tota++;
              } else {
                uncount++;
              }
            }
          });
          setCsvEmployeelen(tota);
          setCsvEmployeelenFailed(uncount);

          if (data) {
            setShow(true);
          }
        }
      });
    };

    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ onDrop, accept: ".csv" });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    paddingTop: "100px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    height: "250px",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
    height: "200px",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
    height: "200px",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );



  const handleClose = () => setShow(false);
  const ActionHanle = () => {
    props.handleSubmitted();
    handleClose();
    let tota = 0;
    csvEmployeeData.forEach((cuEle, index) => {
      console.log(index, cuEle);

      if (index > 0 && cuEle.length >= 3) {
        let cnt = 0;

        for (let i = 0; i <= 2; i++) {
          if (cuEle[i] !== "") {
            cnt++;
          }
        }
        if (cnt === 3) {
          tota++;
          axios
            .post("http://localhost:5000/SendServerEmployeeInfo", {
              firstName: cuEle[0],
              lastName: cuEle[1],
              email: cuEle[2],
            })
            .then(() => {});
        }
      }
    });
    window.alert("Successfullly Inserted");
  };

  return (
    <>
      <div>
        <div className="csvfILE">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some CSV files here, or click to select files</p>
          </div>
          <h6 className="multipleEmployee" onClick={() => props.change(2)}>
            Are you Add Multiple Employee at t time✍👉
          </h6>
          <h4 className="sss" onClick={() => props.change(3)}>
            Are You Send{" "}
            <span className="desing">
              <SiGmail />
            </span>
          </h4>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={classes.paper}>
          <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        <h4 id="transition-modal-title">Employee Information</h4>
        </Typography>
        <Typography variant="h5" component="h2">
        Total {csvEmployeelen} Employees Are Valid Information
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Total {csvEmployeelenFailed} Employees Are InValid Information
        </Typography>
        <Typography variant="body2" component="p">
          Files
          
              <ul>{files}</ul>
          
        </Typography>
      </CardContent>
      <CardActions>
      <h6 className="pl-5 text-danger"> Are You Sure Add To Employee</h6>
              <Button onClick={handleClose}  variant="contained" color="secondary">
                Cancel
              </Button>
              <Button style={{minWidth:'100px'}}onClick={ActionHanle} variant="contained" color="primary">
                Yes
              </Button>
       
      </CardActions>
    </Card>
           
          </div>
        </Fade>
      </Modal>

         
        </div>
      </div>
    </>
  );
};

export default UploadCsv;
