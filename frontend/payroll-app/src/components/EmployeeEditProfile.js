import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const EmployeeEditProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [address, setAddress] = useState('');
    const [backendErrorMsg, setBackendErrorMsg] = useState([]);
    const [msg, setMsg] = useState('');
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/emp')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/employeeeditprofile')
                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))



    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/api/profile', { firstName, lastName, contactNum, address })
            .then(result => {
                if (result.data.errors) {
                    setBackendErrorMsg('');
                    setBackendErrorMsg(result.data.errors)
                    console.log(backendErrorMsg)
                } else {
                    console.log(result.data)
                    setBackendErrorMsg('');
                    setMsg('Changes Saved')
                }
                
                
            })
            .catch(error => console.log(error))
    }
    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
            .then(res => {
                window.location.reload(true);
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {
                auth ?
                    <>
                        <h1>Edit Profile</h1>
                        <NavLink to='/homeEmployee'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/employeeviewsalaryreport'>
                            <button type="button" class="btn btn-primary">View salary reports</button>
                        </NavLink>

                        <NavLink to='/employeeleaverequest'>
                            <button type="button" class="btn btn-primary">Leave Request</button>
                        </NavLink>
                        <NavLink to='/employeeviewprofile'>
                            <button type="button" class="btn btn-primary">View Profile</button>
                        </NavLink>
                        <button type="button" class="btn btn-danger" onClick={handleLogout}>Log Out</button>
                        <br /> <br />
                        <form>
                            <div class="mb-3">
                                <label for="inputFirstName">Enter first name</label>
                                <input class="form-control" type="text" placeholder="First Name" aria-label="default input example" onChange={(e) => setFirstName(e.target.value)}></input>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Enter last name</label>
                                <input class="form-control" type="text" placeholder="Last Name" aria-label="default input example" onChange={(e) => setLastName(e.target.value)}></input>


                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Enter contact</label>
                                <input class="form-control" type="text" placeholder="Contact" aria-label="default input example" onChange={(e) => setContactNum(e.target.value)}></input>


                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Enter address</label>
                                <input class="form-control" type="text" placeholder="Address" aria-label="default input example" onChange={(e) => setAddress(e.target.value)}></input>

                            
                            </div>
                        </form>

                        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Save</button>
                        <br />
                        {backendErrorMsg && backendErrorMsg.map(e => (
                            <p>{e.msg}</p>
                        ))}
                        {msg && <p>{msg}</p>}

                    </>
                    :
                    <>
                        <h2>Please Log in first</h2>
                        <NavLink to='/loginAs'>
                            <button type="button" class="btn btn-primary">Login</button>
                        </NavLink>
                    </>

            }


        </>
    );
}