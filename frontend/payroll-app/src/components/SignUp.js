import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';


export const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [backendErrorMsg, setBackendErrorMsg] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email);
        console.log(password);

        axios.post('http://localhost:3001/api/employees', { email, password })
            .then(result => {


                if (result.data.errors) {
                    setBackendErrorMsg(result.data.errors)
                    console.log(backendErrorMsg);
                } else {

                    console.log(result.data)
                    navigate('/loginAs')
                }

            })
            .catch(error => console.log(error))


    }

    return (
        <>
            <div class="signUp">
                <h1>Sign Up Page</h1>
                <br></br>


                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}></input>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)}></input>

                    </div>
                </form>


                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
                <br></br>
                <NavLink to='/loginAs' style={{ textDecoration: 'none', color: 'black' }}>
                Already have an account? Login
                </NavLink>
                {backendErrorMsg && backendErrorMsg.map(e => (
                    <p>{e.msg}</p>
                ))}
                {errorMsg && <p>{errorMsg}</p>}


            </div>
        </>
    );
}