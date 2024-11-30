const mongoose = require('mongoose');

const SalaryLogsSchema = new mongoose.Schema({
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registers-employee'
    },
    firstName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles'
    },
    lastName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles'
    },
    hoursWorked: {
        type: Number,
        required: true 
    },
    hourlyRate: {
        type: Number,
        required: true 
    },
    grossPay: {
        type: Number,
        
    },
    deductions: {
        type: Number,
        
    },
    netPay: {
        type: Number
    }
})

module.exports = SalaryLogs = mongoose.model('salary-logs', SalaryLogsSchema);