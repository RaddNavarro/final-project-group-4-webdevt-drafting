const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    // firstName: String,
    // lastName: String,
    // middleName: String,
    email: String,
    password: String
});

const EmployeeModel = mongoose.model("registers-employee", EmployeeSchema);

module.exports = EmployeeModel;