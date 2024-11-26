import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3001/registers', {email, password})
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

    return (
        <>
            <div class="loginAdmin">
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
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}></input>

                    </div>
                </form>

              
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
               


            </div>
        </>
    );
}