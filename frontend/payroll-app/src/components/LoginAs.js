import React, { useRef, useState } from 'react';
import { NavLink } from "react-router-dom";


export const LoginAs = () => {
    return (
        <div className="center-square">
            <h1>Login As</h1>
            <NavLink to='/loginAdmin' className="nav-link">
                <button type="button" className="btn btn-primary">Login as Admin</button>
            </NavLink>
            <NavLink to='/loginEmployee' className="nav-link">
                <button type="button" className="btn btn-primary">Login as Employee</button>
            </NavLink>
        </div>
    );
}
