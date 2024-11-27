const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AdminModel = require('./models/Admins.js');
const EmployeeModel = require('./models/Employees.js');
const connectDB = require('./database.js');

const app = express();



app.use(express.json())
app.use(cors())
connectDB();

// connect to server
// mongoose.connect("mongodb://localhost:27017/employee");

// login route
app.post('/login-admin', (request, result) => {
    const { email, password } = request.body;
    // checks the database if the email entered exists
    AdminModel.findOne({ email: email })
        .then(user => {
            // if user existed
            if (user) {
                // if password is correct as in the database
                if (user.password === password) {
                    result.json("Success")
                } else {
                    result.json("Invalid credentials!")
                }
            } else {
                result.json("Record doesn't exist")
            }
        })
});

app.post('/login-employee', (request, result) => {
    const { email, password } = request.body;
    // checks the database if the email entered exists
    EmployeeModel.findOne({ email: email })
        .then(user => {
            // if user existed
            if (user) {
                // if password is correct as in the database
                if (user.password === password) {
                    result.json("Success")
                } else {
                    result.json("Invalid credentials!")
                }
            } else {
                result.json("Record doesn't exist")
            }
        })
});

// register route for admin
app.post('/registers-admin', (request, result) => {
    const { email } = request.body;
    AdminModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.email === request.body.email) {

                    result.json("User already exists!");
                }
            } else {
                AdminModel.create(request.body)
                    .then(employees => result.json(employees))
                    .catch(error => result.json(error));
            }
        })




});

// registers route for employee
app.post('/registers-employees', (request, result) => {
    const { email } = request.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.email === request.body.email) {

                    result.json("User already exists!");
                }
            } else {
                EmployeeModel.create(request.body)
                    .then(employees => result.json(employees))
                    .catch(error => result.json(error));
            }
        })




});

// test connection
app.listen(3001, () => {
    console.log("server is running lmao");
});