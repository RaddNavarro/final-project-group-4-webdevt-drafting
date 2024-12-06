import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';



export const AdminAddEmployee = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [address, setAddress] = useState('');
    const [backendErrorMsg, setBackendErrorMsg] = useState([]);
    const [msg, setMsg] = useState('');
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true;

            axios.post('http://localhost:3001/api/employees', { email, password, firstName, lastName, contactNum, address })
            .then(result => {


                if (result.data.errors) {
                    setBackendErrorMsg(result.data.errors)
                    console.log(backendErrorMsg);
                } else {

                    console.log(result.data)
                    setBackendErrorMsg('')
                    setMsg('Employee Added!')
                    navigate('/adminaddemployee')
                }

            })
            .catch(error => console.log(error))
    }
    return (
        <>

            {
                auth ?
                    <>
                        <h1>Add Employees here</h1>
                        <NavLink to='/homeAdmin'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/adminviewemployee'>
                            <button type="button" class="btn btn-primary">View Employees</button>
                        </NavLink>
                        <NavLink to='/adminmanageleave'>
                            <button type="button" class="btn btn-primary">Manage Leave request</button>
                        </NavLink>
                        <NavLink to='/adminviewallsalary'>
                            <button type="button" class="btn btn-primary">View all salary reports</button>
                        </NavLink>
                        
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
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}></input>
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)}></input>

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
                        navigate('/loginAs')

               
            }

        </>
    );
}