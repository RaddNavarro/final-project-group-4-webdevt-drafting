import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';


export const AdminViewAllSalary = () => {

    const [auth, setAuth] = useState(false);
    const [salary, setSalary] = useState([]);
    const navigate = useNavigate();
    var grossPay;
    var basicSalary;
    var netPay;
    
    salary.map(salary => {

        // formatting them to add commas in thousands
        grossPay = salary.grossPay;
        grossPay = grossPay.toLocaleString(undefined, {maximumFractionDigits:2})

        basicSalary = salary.basicSalary;
        basicSalary = basicSalary.toLocaleString(undefined, {maximumFractionDigits:2})

        netPay = salary.netPay;
        netPay = netPay.toLocaleString(undefined, {maximumFractionDigits:2})

        
    })


    axios.defaults.withCredentials = true;
    useEffect(() => {

        axios.get('http://localhost:3001/admin')
            .then(res => {
                console.log(res.data)
                if (res.data.msg === "Success") {
                    setAuth(true)
                    navigate('/adminviewallsalary')
                } else {
                    setAuth(false);
                    console.log(res.data)

                }

            })
            .catch(error => console.log(error))

            axios.get('http://localhost:3001/api/admins/salary')
            .then(res => {
                console.log(res.data)
                setSalary(res.data)

            })
            .catch(error => console.log(error))




    }, [])

    return (
        <>
            {
                auth ?
                    <>
                        <h1>View Employee's Salary here</h1>
                        <NavLink to='/homeAdmin'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/adminaddemployee'>
                            <button type="button" class="btn btn-primary">Add Employee</button>
                        </NavLink>
                        <NavLink to='/adminviewemployee'>
                            <button type="button" class="btn btn-primary">View Employee</button>
                        </NavLink>
                        <NavLink to='/admineditprofile'>
                            <button type="button" class="btn btn-primary">Edit Employee Profile</button>
                        </NavLink>
                        <NavLink to='/admingeneratesalaryreport'>
                            <button type="button" class="btn btn-primary">Generate Salary Report</button>
                        </NavLink>
                        <NavLink to='/adminmanageleave'>
                            <button type="button" class="btn btn-primary">Manage Leave request</button>
                        </NavLink>


                        {
                            salary && salary.map(salary => (
                                <>
                                <p>Email: {salary.employees.email}</p>
                                <p>Name: {salary.employees.firstName} {salary.employees.lastName}</p>
                                <p>Hours Worked: {salary.hoursWorked} Hours</p>
                                <p>Hourly Rate: ₱{salary.hourlyRate}</p>
                                <p>Basic Salary: ₱{basicSalary}</p>
                                <p>Gross Pay: ₱{grossPay}</p>
                                <p>Net Pay: ₱{netPay}</p>

                                
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