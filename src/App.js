
import './App.css';
import Todo from './Component/Todo/Todo';
import React, { createContext, useState } from 'react';
export const UserContext=createContext();


function App() {
  const [userEmail,setUserEmail]=useState([{
    id:"",
    email:'',
    checked:false
  }]);
  return (
    <UserContext.Provider value={[userEmail,setUserEmail]}>
    <div className="App">
      
  <Todo></Todo>
    </div>
    </UserContext.Provider>
  );
}

export default App;
