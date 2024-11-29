import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const HomeEmployee = () => {

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        
        axios.get('http://localhost:3001/emp')
        .then(res => {
            console.log(res.data)
            if (res.data.msg === "Success") {
                setAuth(true)
                navigate('/homeEmployee')
            } else {
                setAuth(false);
                console.log(res.data)
                
            }

        })
        .catch(error => console.log(error))
       
    

    }, [])

    return (
        <>
            {
                auth ?
                    <>
                

                        <h1>Home Page: Employee</h1>
                        <NavLink to='/employeeviewsalaryreport'>
                            <button type="button" class="btn btn-primary">View salary reports</button>
                        </NavLink>
                        <NavLink to='/employeeviewprofile'>
                            <button type="button" class="btn btn-primary">View Profile</button>
                        </NavLink>
                        <NavLink to='/employeeleaverequest'>
                            <button type="button" class="btn btn-primary">Leave Request</button>
                        </NavLink>
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