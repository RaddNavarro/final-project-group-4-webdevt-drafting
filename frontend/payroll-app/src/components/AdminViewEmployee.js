import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate, Link } from "react-router-dom";
import axios from 'axios';


export const AdminViewEmployee = () => {

    const [auth, setAuth] = useState(false);
    const [users, setUsers] = useState([]);
    // const [msg, setMsg] = useState('');
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

        getAllEmployee();

    }, [])

    const getAllEmployee = () => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/api/employees/all')
            .then(res => {
                setUsers(res.data)
                console.log(res.data)


            })
            .catch(error => console.log(error))
    }

    const handleDelete = (id, name) => {
        const temp = { id }
        console.log(temp);
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            axios.defaults.withCredentials = true;
            axios.delete('http://localhost:3001/api/admins/delete', { data: temp })
                .then(res => {
                    alert(res.data.msg)
                    getAllEmployee();

                })
                .catch(error => console.log(error))
        }
    }

    return (
        <>

            {
                auth ?
                    <>
                        <h1>View Employees here</h1>
                        <NavLink to='/homeAdmin'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/adminaddemployee'>
                            <button type="button" class="btn btn-primary">Add Employee</button>
                        </NavLink>
                        <NavLink to='/adminmanageleave'>
                            <button type="button" class="btn btn-primary">Manage Leave request</button>
                        </NavLink>
                        <NavLink to='/adminviewallsalary'>
                            <button type="button" class="btn btn-primary">View all salary reports</button>
                        </NavLink>


                        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                            <div className="w-50">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                First Name
                                            </th>
                                            <th>
                                                Last Name
                                            </th>
                                            <th>
                                                Contact Number
                                            </th>
                                            <th>
                                                Address
                                            </th>
                                            <th>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            users.length > 0 ?
                                            users.map(users => (
                                                <>
                                                    <tr>
                                                        <td>{users.firstName} </td>
                                                        <td>{users.lastName} </td>
                                                        <td>{users.contactNum} </td>
                                                        <td>{users.address} </td>

                                                        <div class="sigma">
                                                            <Link to={`/admineditprofile/${users._id}`}>
                                                                <button type="button" class="btn btn-primary">Edit</button>
                                                            </Link>
                                                            <Link to={`/admingeneratesalaryreport/${users._id}`}>
                                                                <button type="button" class="btn btn-primary">Generate Salary Report</button>
                                                            </Link>
                                                            <button type="button" class="btn btn-danger" onClick={() => handleDelete(users._id, users.firstName)}>Delete</button>
                                                        </div>
                                                    </tr>

                                                </>
                                            ))
                                            :
                                            <h1>No data</h1>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>


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