
  import React, { useState } from "react";
  import EmailSend from "./EmailSend";
  import EmployeeTable from "./EmployeeTable";
  import UploadAEmployee from "./UploadAEmployee";
  import UploadCsv from "./UploadCsv";
  import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
  import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
  import "./User.css";
  
  const User = () => {
    const [csv, setCsv] = useState(false);
    const [email, setEmail] = useState(false);
    const [load, setLoad] = useState(false);
    const handleSubmitted = () => {
      setLoad(true);
    };
    const change = (value) => {
      if(value===1){
        setCsv(true);
  
      }
      else if(value===2) {
        setCsv(false);
      }
      else {
        setEmail(true);
      }
    };
  return (
    <div className="child-div container-fluid">
       <div>
            <ThemeProvider>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
            <div className="row">
                <div className="col-md-5">
                {csv && email===false ? (
            <>
              <UploadCsv   change={change} handleSubmitted={handleSubmitted}></UploadCsv>
            </>
          ) : email===false? (
            <UploadAEmployee
              load={load}
              setLoad={setLoad}
              change={change}
              handleSubmitted={handleSubmitted}
              csv={csv}
              setCsv={setCsv}
            ></UploadAEmployee>
          ):(
            <div>
             <EmailSend></EmailSend>
         
            </div>
          )}
                
                </div>
            <div className="col-md-7">
            <EmployeeTable change={change} email={email} setEmail={setEmail} load={load} setLoad={setLoad} ></EmployeeTable>
       
     
       
        </div>
            </div>
        </Paper>
      </Container>
    </ThemeProvider>
    </div>
      
    </div>
  );
};

export default User;
