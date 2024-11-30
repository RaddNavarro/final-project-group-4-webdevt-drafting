const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    }
});

const EmployeeModel = mongoose.model("registers-employees", EmployeeSchema);

module.exports = EmployeeModel;