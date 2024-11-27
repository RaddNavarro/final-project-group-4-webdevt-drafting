import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
export const EmployeeViewProfile = () => {
    return (
        <>
        <h1>View Profile</h1>
        <NavLink to='/HomeEmployee'>
                <button type="button" class="btn btn-primary">Home</button>
            </NavLink>
        <NavLink to='/EmployeeViewSalaryReport'>
                <button type="button" class="btn btn-primary">View salary reports</button>
            </NavLink>

            <NavLink to='/EmployeeLeaveRequest'>
                <button type="button" class="btn btn-primary">Leave Request</button>
            </NavLink>
        </>
    );
}