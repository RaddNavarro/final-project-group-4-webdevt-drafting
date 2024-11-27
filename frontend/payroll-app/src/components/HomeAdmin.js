import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
export const HomeAdmin = () => {
    return (
        <>
        <h1>Home Page: Admin</h1>
        <NavLink to='/AdminAddEmployee'>
                <button type="button" class="btn btn-primary">Add Employee</button>
            </NavLink>
            <NavLink to='/AdminViewEmployee'>
                <button type="button" class="btn btn-primary">View Employee</button>
            </NavLink>
            <NavLink to='/AdminGenerateSalaryReport'>
                <button type="button" class="btn btn-primary">Generate Salary Report</button>
            </NavLink>
            <NavLink to='/AdminManageLeave'>
                <button type="button" class="btn btn-primary">Manage Leave request</button>
            </NavLink>
            <NavLink to='/AdminViewAllSalary'>
                <button type="button" class="btn btn-primary">View all salary reports</button>
            </NavLink>
        </>
    );
}