import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";


export const LoginAs = () => {
    return (

        <>
            <h1>Login As Page</h1>
            <NavLink to='/loginAdmin'>
                <button type="button" class="btn btn-primary">Login as Admin</button>
            </NavLink>
            <NavLink to='/loginEmployee'>
                <button type="button" class="btn btn-primary">Login as Employee</button>
            </NavLink>
            <br></br>
            <NavLink to='/signUp' style={{ textDecoration: 'none', color: 'black' }}>Create Account</NavLink>
        </>
    );
}