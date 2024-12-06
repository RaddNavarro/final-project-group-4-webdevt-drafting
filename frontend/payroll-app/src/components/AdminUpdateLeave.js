import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export const AdminUpdateLeave = () => {

    const [auth, setAuth] = useState(false);
    const [leaveStatus, setLeaveStatus] = useState('');
    const [backendErrorMsg, setBackendErrorMsg] = useState([]);
    const [msg, setMsg] = useState('');
    const location = useLocation();
    const [id, setID] = useState();
    const [user, setUser] = useState({});


    const navigate = useNavigate();
    axios.defaults.withCredentials = true;


    useEffect(() => {


        axios.get('http://localhost:3001/admin')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/adminupdateleave')
                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))


        setUser(location.state)
        setID(location.state.id)
        


    }, [])

    const handleSubmit = (e) => {
        
        e.preventDefault()
        axios.defaults.withCredentials = true;

            axios.post('http://localhost:3001/api/admins/leave-requests/edit', {id, leaveStatus})
            .then(result => {


                if (result.data.errors) {
                    setBackendErrorMsg(result.data.errors)
                    console.log(backendErrorMsg);
                } else {

                    console.log(result.data)
                    setBackendErrorMsg('')
                    setMsg('Status Updated!')
                    navigate('/adminupdateleave')
                }

            })
            .catch(error => console.log(error))
    }


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
                        <NavLink to='/adminmangeleave'>
                            <button type="button" class="btn btn-primary">View all salary reports</button>
                        </NavLink>
                        <br /> <br /> <br />

                        <form>
                            <label for="inputFirstName">Update status for {user.name}</label>


                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Update Status</label>
                                <select class="form-select" aria-label="Default select example" value={leaveStatus} onChange={(e) => setLeaveStatus(e.target.value)}>
                                    <option>Pending</option>
                                    <option>Accepted</option>
                                    <option>Rejected</option>
                                </select>

                                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Update</button>


                            </div>

                        </form>

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