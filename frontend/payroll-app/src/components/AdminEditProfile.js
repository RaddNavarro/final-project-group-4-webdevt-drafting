import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const AdminEditProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [address, setAddress] = useState('');
    const [backendErrorMsg, setBackendErrorMsg] = useState([]);
    const [msg, setMsg] = useState('');
    const [auth, setAuth] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/admin')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/admineditprofile')
                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))

        axios.get('http://localhost:3001/api/employees/all')
            .then(res => {
                console.log(res.data)
                setEmployees(res.data);

            })
            .catch(error => console.log(error))





    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/api/employees/edit', { email, firstName, lastName, contactNum, address })
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


    return (
        <>
            {
                auth ?
                    <>
                        <h1>Edit Profile</h1>
                        <NavLink to='/homeAdmin'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/adminaddemployee'>
                            <button type="button" class="btn btn-primary">Add Employee</button>
                        </NavLink>
                        <NavLink to='/adminviewemployee'>
                            <button type="button" class="btn btn-primary">View Employees</button>
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

                        <br /> <br />
                        <form>
                        <label for="inputFirstName">Select Employee to edit</label>
                            <select class="form-select" aria-label="Default select example" value={email} onChange={(e) => setEmail(e.target.value)}>
                                <option>Select Employee email...</option>
                                {
                                    employees.map(emp => <option>{emp.email}</option>)
                                }
                            </select>   
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