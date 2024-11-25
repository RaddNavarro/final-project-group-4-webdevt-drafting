import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";


export const LoginEmployee = () => {
    return (

        <>
            <h1>Login Employee Page</h1>
            <NavLink to='/home'>
                <button type="button" class="btn btn-primary">Home</button>
            </NavLink>  
        </>
    );
}