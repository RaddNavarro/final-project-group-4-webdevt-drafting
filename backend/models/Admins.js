const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    email: String,
    password: String
});

const AdminModel = mongoose.model("registers-admin", EmployeeSchema);

module.exports = AdminModel;