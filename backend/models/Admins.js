const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String
});

const AdminModel = mongoose.model("registers-admin", AdminSchema);

module.exports = AdminModel;