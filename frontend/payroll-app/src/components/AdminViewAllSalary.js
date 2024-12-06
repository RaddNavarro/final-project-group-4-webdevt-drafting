import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';


export const AdminViewAllSalary = () => {

    const [auth, setAuth] = useState(false);
    const [salary, setSalary] = useState([]);
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

            getAllSalary();




    }, [])

    const getAllSalary = () => {
        axios.get('http://localhost:3001/api/admins/salary')
        .then(res => {
            console.log(res.data)
            setSalary(res.data)

        })
        .catch(error => console.log(error))
    }

    const handleDelete = (id, name) => {
        const temp = { id }
        console.log(temp);
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            axios.defaults.withCredentials = true;
            axios.delete('http://localhost:3001/api/admins/delete-salary', { data: temp })
                .then(res => {
                    alert(res.data.msg)
                    getAllSalary();

                })
                .catch(error => console.log(error))
        }
    }

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
                        <NavLink to='/adminmanageleave'>
                            <button type="button" class="btn btn-primary">Manage Leave request</button>
                        </NavLink>


<div>
    <div>


        <table className="table">
            <thead>
<tr>

    <th>
    Email
    </th>
    <th>
    Name
    </th>
    <th>
    Hours Worked
    </th>
    <th>
    Hourly Rate:
    </th>
    <th>
    Basic Salary:
    </th>
    <th>
    Overtime Pay:
    </th>
    <th>
    Gross Pay:
    </th>
    <th>
    Deductions:
    </th>
    <th>
    Net Pay:
    </th>
</tr>
            
            </thead>
            <tbody>
                        {
                        
                            salary.length > 0 ? salary.map(salary => (
                           
                                
                                <>
                                
                                <tr>
                                    <td>{salary.employees.email}</td>
                                    <td>{salary.employees.firstName} {salary.employees.lastName}</td>
                                    <td>{salary.hoursWorked}</td>
                                    <td>{salary.hourlyRate}</td>
                                    <td>₱{salary.basicSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td>₱{salary.overtimePay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td>₱{salary.grossPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td>₱{salary.deductions.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td>₱{salary.netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                    <div class="sigma">
                                        <button type="button" class="btn btn-danger" onClick={() => handleDelete(salary._id, salary.employees.firstName)}>Delete</button>
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