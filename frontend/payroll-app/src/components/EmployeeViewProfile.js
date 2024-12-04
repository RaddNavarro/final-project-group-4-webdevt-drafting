import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const EmployeeViewProfile = () => {
    const [auth, setAuth] = useState(false);
    const [backendErrorMsg, setBackendErrorMsg] = useState('');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/emp')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/employeeviewprofile')
                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))


        axios.get('http://localhost:3001/api/employees/me')
            .then(res => {
                console.log(res.data);
                if (res.data.msg) {
                    setBackendErrorMsg(res.data.msg);
                    console.log(res.data.msg);
                } else {
                    setBackendErrorMsg([]);

                    setUser(res.data)
                    console.log(user);

                }

            })
            .catch(error => console.log(error))



    }, [])

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
                        <h1>View Profile</h1>
                        <NavLink to='/homeEmployee'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/employeeviewsalaryreport'>
                            <button type="button" class="btn btn-primary">View salary reports</button>
                        </NavLink>

                        <NavLink to='/employeeleaverequest'>
                            <button type="button" class="btn btn-primary">Leave Request</button>
                        </NavLink>

                        <button type="button" class="btn btn-danger" onClick={handleLogout}>Log Out</button>
                        <br /> <br /> <br /> <br />

                        {
                            user ?
                                <>
                                    <p>Email: {user.email} </p>
                                    <p>First Name: {user.firstName} </p>
                                    <p>Last Name: {user.lastName} </p>
                                    <p>Contact: {user.contactNum} </p>
                                    <p>Address: {user.address} </p>


                                </>
                                :
                                <>
                                    <h1>Welcome, User</h1>
                                    {backendErrorMsg && <p>{backendErrorMsg}</p>}
                                </>
                        }

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