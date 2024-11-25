import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { AddEmployee, Home, LoginEmployee, MyPayroll, MyProfile, PayrollLogs, ViewEmployee, LoginAdmin, LoginAs } from './components';
import './App.css';





function App() {

  const [employees, setEmployees] = useState([]);
  const [employeeUser, setEmployeeUser] = useState([]);
  


  return (
    <>
      <div className="App">

        <Routes>
          <Route index element={<LoginAs />}></Route>
          <Route path='/loginAdmin' element={<LoginAdmin />}></Route>
          <Route path='/loginEmployee' element={<LoginEmployee />}></Route>
          
        </Routes>

        <Routes>

          <Route path='/home' element={<Home />} />
          <Route path='/addEmployee' element={<AddEmployee />} />
          <Route path='/myPayroll' element={<MyPayroll />} />
          <Route path='/MyProfile' element={<MyProfile />} />
          <Route path='/payrollLogs' element={<PayrollLogs />} />
          <Route path='/viewEmployee' element={<ViewEmployee />} />

        </Routes>

      </div>

      <Routes>

      </Routes>
    </>
  );
}

export default App;