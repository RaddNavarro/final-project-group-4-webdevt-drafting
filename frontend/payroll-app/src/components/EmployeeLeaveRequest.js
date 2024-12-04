import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


export const EmployeeLeaveRequest = () => {

    const [auth, setAuth] = useState(false);
    const [numDays, setNumDays] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [leaveType, setLeaveType] = useState();
    const [dateIssued, setDateIssued] = useState();
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/emp')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/employeeleaverequest')
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
                        <h1>Process Leave Request</h1>
                        <NavLink to='/homeEmployee'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/employeeviewsalaryreport'>
                            <button type="button" class="btn btn-primary">View salary reports</button>
                        </NavLink>
                        
                        <NavLink to='/employeeviewprofile'>
                            <button type="button" class="btn btn-primary">View Profile</button>
                        </NavLink>
                        <br /> <br />

                        <form>
                            <div class="mb-3">
                                <label for="inputFirstName">Enter number of days</label>
                                <input class="form-control" type="number" placeholder="Number of days" aria-label="default input example" onChange={(e) => setNumDays(e.target.value)}></input>
                            </div> 
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Enter Leave Type</label>
                                <select class="form-select" aria-label="Default select example" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                <option>Select Leave Type...</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Vacation">Vacation</option>
                                </select>  
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Start Date</label>
                                <DatePicker 
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                dateFormat={"MM/dd/yyyy"}
                                
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">End Date</label>
                                <DatePicker 
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                dateFormat={"MM/dd/yyyy"}
                                minDate={startDate}
                                />
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