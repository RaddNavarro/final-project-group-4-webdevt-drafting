import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const AdminGenerateSalaryReport = () => {

    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState('');
    const [employees, setEmployees] = useState([]);
    const [hoursWorked, setHoursWorked] = useState();
    const [hourlyRate, setHourlyRate] = useState();
    const [backendErrorMsg, setBackendErrorMsg] = useState([]);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/admin')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/admingeneratesalaryreport')
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
        axios.post('http://localhost:3001/api/admins/generate', { email, hoursWorked, hourlyRate })
            .then(result => {
                if (result.data.errors) {
                    setBackendErrorMsg('');
                    setBackendErrorMsg(result.data.errors)
                    console.log(backendErrorMsg)
                } else {
                    console.log(result.data)
                    setBackendErrorMsg('');
                    setMsg('Success')
                }


            })
            .catch(error => console.log(error))
    }


    return (
        <>

            {
                auth ?
                    <>
                        <h1>Generate Employee Salary Report here</h1>
                        <NavLink to='/homeAdmin'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/adminaddemployee'>
                            <button type="button" class="btn btn-primary">Add Employee</button>
                        </NavLink>
                        <NavLink to='/adminviewemployee'>
                            <button type="button" class="btn btn-primary">View Employee</button>
                        </NavLink>
                        <NavLink to='/adminmanageleave'>
                            <button type="button" class="btn btn-primary">Manage Leave request</button>
                        </NavLink>
                        <NavLink to='/adminviewallsalary'>
                            <button type="button" class="btn btn-primary">View all salary reports</button>
                        </NavLink>
                        <NavLink to='/admineditprofile'>
                            <button type="button" class="btn btn-primary">Edit Employee Profile</button>
                        </NavLink>

                        <br /> <br /> <br />
                        <label for="inputFirstName">Select Employee to edit</label>
                            <select class="form-select" aria-label="Default select example" value={email} onChange={(e) => setEmail(e.target.value)}>
                                <option>Select Employee email...</option>
                                {
                                    employees.map(emp => <option>{emp.email}</option>)
                                }
                            </select>   
                        <form>
                            <div class="mb-3">
                                <label for="inputFirstName">Enter Hours Worked</label>
                                <input class="form-control" type="number" placeholder="Hours Worked" aria-label="default input example" onChange={(e) => setHoursWorked(e.target.value)}></input>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Enter Hourly Rate</label>
                                <input class="form-control" type="number" placeholder="Hourly Rate" aria-label="default input example" onChange={(e) => setHourlyRate(e.target.value)}></input>
                            </div>
                        </form>

                        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Generate Report</button>
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