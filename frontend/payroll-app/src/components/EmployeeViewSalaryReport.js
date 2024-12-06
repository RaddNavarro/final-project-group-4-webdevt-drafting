import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';



export const EmployeeViewSalaryReport = () => {

    const [auth, setAuth] = useState(false);

    const [backendErrorMsg, setBackendErrorMsg] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    var grossPay;
    var basicSalary;
    var netPay;

    // formatting them to add commas in thousands
    user.map(user => {
        basicSalary = user.basicSalary;
        basicSalary = basicSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })

        netPay = user.netPay;
        netPay = netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })

        grossPay = user.grossPay;
        grossPay = grossPay.toLocaleString(undefined, { maximumFractionDigits: 2 })
    })


    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/emp')
            .then(res => {
                if (res.data.msg === "Success") {
                    setAuth(true)
                    console.log(res.data)
                } else {
                    setAuth(false);


                }

            })
            .catch(error => console.log(error))


        axios.get('http://localhost:3001/api/employees/salary')
            .then(res => {
                    setBackendErrorMsg('');
                    setUser(res.data)

                })
            .catch(error => console.log(error))



    }, [])


    return (

        <>
            {
                auth ?
                    <>
                        <h1>View Salary Report</h1>
                        <NavLink to='/homeEmployee'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/employeeviewprofile'>
                            <button type="button" class="btn btn-primary">View Profile</button>
                        </NavLink>
                        <NavLink to='/employeeleaverequest'>
                            <button type="button" class="btn btn-primary">Leave Request</button>
                        </NavLink>

                        {
                            user.length > 0 ? user.map(user => (
                                <>
                                    <p>Email: {user.employees.email}</p>
                                    <p>Name: {user.employees.firstName} {user.employees.lastName}</p>
                                    <p>Total Hours Worked: {user.hoursWorked} Hours</p>
                                    <p>Hourly Rate: ₱{user.hourlyRate}</p>
                                    <p>Basic Salary: ₱{basicSalary}</p>
                                    <p>Gross Pay: ₱{grossPay}</p>
                                    <p>Net Pay: ₱{netPay}</p>

                                </>
                            ))


                                :
                                <h1>No data</h1>


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