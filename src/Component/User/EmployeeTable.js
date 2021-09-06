import React, { useContext } from "react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Axios from "axios";
import { Form } from "react-bootstrap";
import { UserContext } from "../../App";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { Checkbox } from "@material-ui/core";
const EmployeeTable = (props) => {
  console.log("props",props);
  const [EmployeeData, setEmployeeData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [checkedTrue, setCheckedTrue] = useState(false);
  const [userEmail, setUserEmail] = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/getServertoClient").then((response) => {
      console.log(response.data);
      setEmployeeData(response.data);
    });
  }, [props.load]);
  useEffect(() => {
    props.setLoad(() => false);
  }, [props.load]);
  useEffect(() => {
    setChecked(true);
  }, [userEmail]);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(EmployeeData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const emailChecked = (userId, email) => {
    console.log(userId, email, EmployeeData);
    if (userEmail.length > 1) {
      const flag = userEmail.find((currentValue) => {
        return userId === currentValue.id;
      });
      if (flag) {
        if (flag.checked) {
          console.log("Hello", flag);
          const flagValue = userEmail.filter((currentValue) => {
            return flag.id !== currentValue.id;
          });
          console.log("flagvalue", flagValue);
          var obj2 = {
            id: userId,
            email: email,
            checked: false,
          };

          setUserEmail((val) => [...flagValue, obj2]);
        } else {
          console.log("Hello", flag);
          const flagValue = userEmail.filter((currentValue) => {
            return flag.id !== currentValue.id;
          });
          console.log("flagvalue", flagValue);
          var obj2 = {
            id: userId,
            email: email,
            checked: true,
          };
          setUserEmail((val) => [...flagValue, obj2]);
        }
      } else {
        var obj = {
          id: userId,
          email: email,
          checked: true,
        };
        console.log("sdf", obj);

        setUserEmail((val) => [...val, obj]);
      }
    } else {
      var objj = {
        id: userId,
        email: email,
        checked: true,
      };
      console.log("sdf", objj);

      setUserEmail((val) => [...val, objj]);
    }
  };
  

  console.log(userEmail, "userEmailTable", EmployeeData);
  return (
    <div>
      <div className="text-center">
        <h4 className="text-info">
          {" "}
          <strong style={{color:'#115293'}}>Employee Information</strong>
        </h4>
        {props.email ? (
          <span>
          <div id="collapse1">
            <table className="contentTable">
              <thead>
                <tr>
                  {props.email === true && <th>Select</th>}
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              {EmployeeData.map((data) => {
                return (
                  <tbody>
                    <tr>
                      {props.email === true && (
                        <td>
                          {userEmail.find(
                            (d) => d.id === data.id && d.checked === true
                          ) ? (
                            <span>
                              <Checkbox
                                checked={true}
                                onClick={() =>
                                  emailChecked(data.id, data.employee_email)
                                }
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            </span>
                          ) : (
                            <span>
                              <Checkbox
                                checked={false}
                                onClick={() =>
                                  emailChecked(data.id, data.employee_email)
                                }
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            </span>
                          )}
                        </td>
                      )}
                      <td>{data.employee_FirstName}</td>
                      <td>{data.employee_LastName}</td>
                      <td>{data.employee_email}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <br/>
           
            
          </div>
          <br/>
            <h6 className="multipleEmployee" onClick={()=>props.change(2)}>
          Are you Add Multiple Employee at t time✍👉
        </h6>
          </span>
          
        ) : (
          <>
            <table className="contentTable">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              {EmployeeData.slice(
                pagesVisited,
                pagesVisited + usersPerPage
              ).map((data) => {
                return (
                  <tbody>
                    <tr>
                      <td>{data.employee_FirstName}</td>
                      <td>{data.employee_LastName}</td>
                      <td>{data.employee_email}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
            
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
