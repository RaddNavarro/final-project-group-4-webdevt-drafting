import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
export const EmployeeLeaveRequest= () => {
    return (
        <>
        <h1>Process Leave Request</h1>
        <NavLink to='/HomeEmployee'>
                <button type="button" class="btn btn-primary">Home</button>
            </NavLink>
        <NavLink to='/EmployeeViewSalaryReport'>
                <button type="button" class="btn btn-primary">View salary reports</button>
            </NavLink>
            <NavLink to='/EmployeeViewProfile'>
                <button type="button" class="btn btn-primary">View Profile</button>
            </NavLink>

        </>
    );
}