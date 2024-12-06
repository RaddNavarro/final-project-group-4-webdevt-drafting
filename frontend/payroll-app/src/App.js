import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { HomeEmployee, HomeAdmin, AdminViewEmployee, AdminEditProfile, AdminAddEmployee, AdminGenerateSalaryReport, AdminViewAllSalary, AdminManageLeave, EmployeeViewSalaryReport, EmployeeViewProfile, EmployeeLeaveRequest, LoginEmployee, AdminUpdateLeave, LoginAdmin, LoginAs, SignUp} from './components';
import './App.css';



function App() {

  return (
    <>
      <div className="App">

        <Routes>
          <Route index element={<LoginAs />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/loginAdmin' element={<LoginAdmin />}></Route>
          <Route path='/loginEmployee' element={<LoginEmployee />}></Route>
          <Route path='/loginAs' element={<LoginAs />}></Route>

        </Routes>

        <Routes>

          <Route path='/homeEmployee' element={<HomeEmployee />} />
          
          <Route path='/homeAdmin' element={<HomeAdmin />} />
          <Route path='/adminviewemployee' element={<AdminViewEmployee />} />
          <Route path='/adminaddemployee' element={<AdminAddEmployee />} />
          <Route path='/admingeneratesalaryreport/:id' element={<AdminGenerateSalaryReport/>} />
          <Route path='/adminviewallsalary' element={<AdminViewAllSalary/>} />
          <Route path='/adminmanageleave' element={<AdminManageLeave/>} />
          <Route path='/employeeviewsalaryreport' element={<EmployeeViewSalaryReport />} />
          <Route path='/employeeleaverequest' element={<EmployeeLeaveRequest />} />
          <Route path='/employeeviewprofile' element={<EmployeeViewProfile/>} />
          <Route path='/admineditprofile/:id' element={<AdminEditProfile/>} />
          <Route path='/adminupdateleave/:id/:firstName' element={<AdminUpdateLeave/>} />

        </Routes>

      </div>

      <Routes>

      </Routes>
    </>
  );
}

export default App;
