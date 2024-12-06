import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from 'react-to-print';


export const EmployeeViewSalaryReport = () => {

    const contentRef = useRef();

    const [auth, setAuth] = useState(false);

    const [backendErrorMsg, setBackendErrorMsg] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

 

    var grossPay;
    var basicSalary;
    var netPay;
    var deductions;
    var overtimePay;

    // formatting them to add commas in thousands
    user.map(user => {
        basicSalary = user.basicSalary;
        basicSalary = basicSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })

        netPay = user.netPay;
        netPay = netPay.toLocaleString(undefined, { maximumFractionDigits: 2 })

        grossPay = user.grossPay;
        grossPay = grossPay.toLocaleString(undefined, { maximumFractionDigits: 2 })

        deductions = user.deductions;
        deductions = deductions.toLocaleString(undefined, { maximumFractionDigits: 2 })

        overtimePay = user.overtimePay;
        overtimePay = overtimePay.toLocaleString(undefined, { maximumFractionDigits: 2 })
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


    
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: 'emp-data',
    //     onAfterPrint: () => alert('Print Success')
    // });

    const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: 'emp-data' });

    return (

        <>
            {
                auth ?
                    <>
                        <h1 >View Salary Report</h1>
                        <NavLink to='/homeEmployee'>
                            <button type="button" class="btn btn-primary">Home</button>
                        </NavLink>
                        <NavLink to='/employeeviewprofile'>
                            <button type="button" class="btn btn-primary">View Profile</button>
                        </NavLink>
                        <NavLink to='/employeeleaverequest'>
                            <button type="button" class="btn btn-primary">Request for Leave</button>
                        </NavLink>
                   
             
{/* <button type="button" class="btn btn-primary" onClick={handlePrint}>Download to PDF</button> */}
<button type="button" class="btn btn-primary" onClick={reactToPrintFn}>Download to PDF</button>



    <div className="wrap" ref={contentRef}>
    <div>
    <p className="skibidi"> ACNE CorpㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤSalary Slip</p>

    <p className="skibidi2">Some street 273228</p>
    <p className="skibidi2">Some City, 21321</p>
    

       
            <tbody >
                        {
                        
                        user.length > 0 ? user.map(user => (
                                
                            <>
                            
<div className="toilet">
                                <p>Email: {user.employees.email}</p>
                                <p>Id: {user._id}</p>
                                <p>Name:{user.employees.firstName} {user.employees.lastName}</p>
</div>
                                
                                </>

                            ))


                                :
                                <h1>No data</h1>


                        }
                        </tbody>
                        <br></br><br></br><br></br>                 
 <table className="table1">  
    <tbody>
{
                        
                        user.length > 0 ? 
                                
                            <>
                            
                            <tr className="shit">
       
                                <p><b>Basic Salary:</b>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ₱{basicSalary}</p>
                                <p><b>Overtime Pay:</b> ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ₱{overtimePay}</p>
                                <p><b>Gross pay:</b>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ₱{grossPay}</p>
                                <p><b>Total Net Pay:</b>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ ㅤㅤㅤ<b>₱{netPay}</b></p>
                                </tr>
                            
                                </>

                            


                                :
                                <h1>No data</h1>


                        }   
                       </tbody>
                       </table>
                       <table className="table2">  
                       <tbody>
                      
                        {
                        
                        user.length > 0 ? 
                                
                            <>

                            
                                
                                <p>₱{deductions}ㅤㅤㅤㅤㅤㅤㅤㅤㅤ<b>Deductions</b></p>
                                <p>ㅤㅤㅤㅤㅤㅤㅤㅤㅤ</p>
                                <p>ㅤㅤㅤㅤㅤㅤㅤㅤㅤ</p>
                                <p><b>₱{deductions}</b>ㅤㅤㅤㅤㅤㅤ<b>Total Deductions</b></p>
                                
                                
                                
                                </>




                                :
                                <h1>No data</h1>


                        }
                        
                        </tbody>
                        </table>
</div>
</div>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

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