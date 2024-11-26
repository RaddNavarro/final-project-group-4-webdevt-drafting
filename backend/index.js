const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee.js');


const app = express();

app.use(express.json())
app.use(cors())

// connect to server
mongoose.connect("mongodb://localhost:27017/employee");

// routing to the register table
app.post('/registers', (request, response) => {
    EmployeeModel.create(request.body)
    .then(employees => response.json(employees))
    .catch(error => response.json(error));
})

// test connection
app.listen(3001, () => {
    console.log("server is running lmao");
})