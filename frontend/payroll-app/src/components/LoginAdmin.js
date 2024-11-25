import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";


export const LoginAdmin = () => {

    const [adminUser, setAdminUser] = useState([
        { email: "admin@gmail.com", password: "password123" },
        { email: "admin2@gmail.com", password: "password123" }
    ]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const emailAdmin = useRef('');
    const passwordAdmin = useRef('');

    const navigate = useNavigate();

    const isCorrect = (email, password) => {
        
        return adminUser.some(adminUser => adminUser.email === email && adminUser.password === password)
    }

    const handleLogin = () => {
        if (isCorrect(email, password)) {
            navigate('/home');
            
        } 
        else {
            setErrorMsg("Invalid Login!");
           
        }
    }


    return (

        <>
            <div class="loginAdmin">
                <h1>Login Admin Page</h1>
                <br></br>


                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)}></input>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)}></input>

                    </div>
                </form>

                <button type="button" class="btn btn-primary" onClick={handleLogin}>Login</button>

                {errorMsg ? <p>{errorMsg}</p> : ''}
            </div>
        </>
    );
}