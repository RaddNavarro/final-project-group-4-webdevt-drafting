const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registers-employee'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    middleName: {
        type: String
    },
    contact: {
        type: String
    },
    address: {
        type: String
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);