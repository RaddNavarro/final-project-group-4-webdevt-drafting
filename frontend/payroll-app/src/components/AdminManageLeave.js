import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export const AdminManageLeave = () => {

    const [auth, setAuth] = useState(false);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/admin')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)

                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))

        axios.get('http://localhost:3001/api/admins/leave-requests')
            .then(res => {
                setRequests(res.data);

            })
            .catch(error => console.log(error))



    }, [])

    return (
        <>
            {
                auth ?
                    <>
                        <h1>Manage Leave reports here</h1>
                        <NavLink to='/homeAdmin'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/adminaddemployee'>
                            <button type="button" class="btn btn-primary">Add Employee</button>
                        </NavLink>
                        <NavLink to='/adminviewemployee'>
                            <button type="button" class="btn btn-primary">View Employee</button>
                        </NavLink>
                        <NavLink to='/admingeneratesalaryreport'>
                            <button type="button" class="btn btn-primary">Generate Salary Report</button>
                        </NavLink>
                        <NavLink to='/adminviewallsalary'>
                            <button type="button" class="btn btn-primary">View all salary reports</button>
                        </NavLink>
                        <br /> <br /> <br />


                        {
                            requests &&
                            requests.map(request => (
                                <>
                                    <p>Name: {request.employees.firstName} {request.employees.lastName} </p>
                                    <p>Date Issued: {request.dateIssued}</p>
                                    <p>Leave Type: {request.leaveType}</p>
                                    <p>Number of Days: {request.numDays} </p>
                                    <p>Status: {request.leaveStatus}</p>
                                   


                                    <Link to={`/adminupdateleave/${request._id}/${request.employees.firstName}`}>
                                        <button type="button" class="btn btn-primary">Edit</button>
                                    </Link>
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