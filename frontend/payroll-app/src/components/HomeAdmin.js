import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';



export const HomeAdmin = () => {

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/admin')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/homeAdmin')
                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))



    }, [])

    const handleLogout = (e) => {
        axios.get('http://localhost:3001/logoutAdmin')
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
                        <h1>Home Page: Admin</h1>
                        <NavLink to='/adminaddemployee'>
                            <button type="button" class="btn btn-primary">Add Employees</button>
                        </NavLink>
                        <NavLink to='/adminviewemployee'>
                            <NavLink to='/admineditprofile'>
                                <button type="button" class="btn btn-primary">Edit Employee Profile</button>
                            </NavLink>
                            <button type="button" class="btn btn-primary">View Employee</button>
                        </NavLink>
                        <NavLink to='/admingeneratesalaryreport'>
                            <button type="button" class="btn btn-primary">Generate Salary Report</button>
                        </NavLink>
                        <NavLink to='/adminmanageleave'>
                            <button type="button" class="btn btn-primary">Manage Leave request</button>
                        </NavLink>
                        <NavLink to='/adminviewallsalary'>
                            <button type="button" class="btn btn-primary">View all salary reports</button>
                        </NavLink>
                        <button type="button" class="btn btn-danger" onClick={handleLogout}>Log Out</button>
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