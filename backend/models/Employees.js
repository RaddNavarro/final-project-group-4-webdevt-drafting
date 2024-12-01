const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true 
    },
    contactNum: {
        type: String,
        required: true 
    },
    address: {
        type: String,
        required: true 
    }
});

const EmployeeModel = mongoose.model("registers-employees", EmployeeSchema);

module.exports = EmployeeModel;