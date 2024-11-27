import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
export const HomeEmployee = () => {
    return (
        <>
        <h1>Home Page: Employee</h1>
        <NavLink to='/EmployeeViewSalaryReport'>
                <button type="button" class="btn btn-primary">View salary reports</button>
            </NavLink>
            <NavLink to='/EmployeeViewProfile'>
                <button type="button" class="btn btn-primary">View Profile</button>
            </NavLink>
            <NavLink to='/EmployeeLeaveRequest'>
                <button type="button" class="btn btn-primary">Leave Request</button>
            </NavLink>
        </>
    );
}