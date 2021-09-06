import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { SiGmail } from 'react-icons/si';
import Button from '@material-ui/core/Button'
import { createTheme,ThemeProvider } from '@material-ui/core/styles';



const theme = createTheme({
  palette: {
    primary:{
      main: '#115293',
    },
  },
});
const UploadAEmployee = (props) => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data,e) => {
    Axios.post("http://localhost:5000/SendServerEmployeeInfo", {
      firstName: data.FirstName,
      lastName: data.LastName,
      email: data.Email,
    }).then(() => {
      window.alert("Successfullly Inserted");
      e.target.reset();
    });
  };

  return (
  
      <div className="userHome">
         <strong style={{color:'#115293'}}>TechNext Project</strong>
        <h4 className="text-info">
          {" "}
          <strong style={{color:'#115293'}}>Create A New Employee</strong>
        </h4>
        <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          <input
            placeHolder="First Name"
            {...register("FirstName", { required: true })}
          />
          <br />
          {errors.FirstName && (
            <span className="errorMessage">This field is required</span>
          )}
          <br />

          {/* include validation with required or other standard HTML validation rules */}
          <input
            placeholder="LastName"
            {...register("LastName", { required: true })}
          />
          <br />
          {errors.LastName && (
            <span className="errorMessage">This field is required</span>
          )}
          <br />

          <input
            placeholder="Email"
            {...register("Email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
            })}
          />
          <br />
          {/* errors will return when field validation fails  */}
          {errors.Email && (
            <span className="errorMessage">Plz Filled Valid Email</span>
          )}
          <br />
          <ThemeProvider theme={theme}>
        <Button onClick={props.handleSubmitted}
            type="submit" variant="contained" color="primary"  className="submitButtoon">
        Add to New Employeee
        </Button>
      </ThemeProvider>

          
        </form>
        <h6 className="multipleEmployee" onClick={()=>props.change(1)}>
          Are you Add Multiple Employee at t time✍👉
        </h6>
        <h6 className="sss" onClick={()=>props.change(3)}>
        Are You Send <span className="desing"><SiGmail /></span>
        </h6>
      </div>
 
  );
};

export default UploadAEmployee;
