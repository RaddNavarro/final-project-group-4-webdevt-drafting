import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, redirect, useNavigate } from "react-router-dom";
import axios from 'axios';


export const LoginEmployee = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backendErrorMsg, setBackendErrorMsg] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
       axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/api/auth/employee', { email, password })
            .then(result => {
                // console.log(result.data)
                if (result.data.errors) {
                    setBackendErrorMsg(result.data.errors)
                    console.log(backendErrorMsg)
                } else {
                        console.log(result.data)
                        navigate('/homeEmployee')
                }
            })
            .catch(error => console.log(error))
    }

    return (

        <>
            <div class="loginEmployee">
                <h1>Log In as Employee Page</h1>
                <br></br>


                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}></input>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}></input>

                    </div>
                </form>


                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Log In</button>
                <br></br>
                <br></br>
                <NavLink to='/loginAs' style={{ textDecoration: 'none', color: 'black' }}>Back</NavLink>
                
                {backendErrorMsg && backendErrorMsg.map(e => (
                    <p>{e.msg}</p>
                ))}


            </div>
        </>
    );
}