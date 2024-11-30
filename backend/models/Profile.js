const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registers-employees'
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
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema);