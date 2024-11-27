import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
export const EmployeeViewSalaryReport = () => {
    return (
        <>
        <h1>View Salary Report</h1>
        <NavLink to='/HomeEmployee'>
                <button type="button" class="btn btn-primary">Home</button>
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