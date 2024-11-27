import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const regEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email);
        console.log(password);
        console.log(regEx.test(email));
        console.log(password.length);

        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#\$%\^&\*])');
        const length = new RegExp ('(?=.{8,})');

        if (length.test(password)) {
            setLengthValidated(true);
        } else {
            setLengthValidated(false);
        }

        if (special.test(password)) {
            setSpecialValidated(true);
        } else {
            setSpecialValidated(false);
        }

        if (number.test(password)) {
            setNumberValidated(true);
        } else {
            setNumberValidated(false);
        }

        if (upper.test(password)) {
            setUpperValidated(true);
        } else {
            setUpperValidated(false);
        }

        if (lower.test(password)) {
            setLowerValidated(true);
        } else {
            setLowerValidated(false);
        }



        if (email && password) {

            if (regEx.test(email) === true && lowerValidated === true && upperValidated === true && numberValidated === true && specialValidated === true && lengthValidated === true) {


                axios.post('http://localhost:3001/registers-employees', { email, password })
                    .then(result => {
                        console.log(result)
                        if (result.data === "User already exists!") {
                            setErrorMsg(result.data);
                        } else {
                            navigate('/loginAs')
                        }
                    })
                    .catch(error => console.log(error))
            } else if (!regEx.test(email) === true) {
                setErrorMsg('Invalid Email!')
            } else if (lengthValidated === false) {
                setErrorMsg('At least 8 characters')
            } else if (specialValidated === false) {
                setErrorMsg('At least one special character')
            } else if (numberValidated === false) {
                setErrorMsg('At least one number')
            } else if (upperValidated === false) {
                setErrorMsg('At least one upper character')
            } else {
                setErrorMsg('At least lower character')
            }


        } else {
            setErrorMsg('Input fields!')
        }



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
                {errorMsg && <p>{errorMsg}</p>}


            </div>
        </>
    );
}