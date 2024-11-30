import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';


export const AdminViewEmployee = () => {

    const [auth, setAuth] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/admin')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/adminviewemployee')
                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))

        axios.get('http://localhost:3001/api/profile/all')
            .then(res => {
                setUsers(res.data)
                console.log(res.data)


            })
            .catch(error => console.log(error))


    }, [])

    return (
        <>

            {
                auth ?
                    <>
                        <h1>View Employees here</h1>
                        <NavLink to='/adminaddemployee'>
                            <button type="button" class="btn btn-primary">Add Employee</button>
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
                        <br /> <br /> <br />


                        {
                            users &&
                            users.map(users => (
                                <>
                                <p>Email: {users.employees.email} </p>
                            <p>First Name: {users.firstName} </p>
                            <p>Last Name: {users.lastName} </p>
                            <p>Contact: {users.contactNum} </p>
                            <p>Address: {users.address} </p>
                            </>
                            ))
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