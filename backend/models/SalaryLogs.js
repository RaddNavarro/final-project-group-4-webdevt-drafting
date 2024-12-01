const mongoose = require('mongoose');

const SalaryLogsSchema = new mongoose.Schema({
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registers-employees'
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
        default: 0
        
    },
    deductions: {
        type: Number,
        default: 0
        
    },
    netPay: {
        type: Number,
        default: 0
        
    }
})

module.exports = SalaryLogs = mongoose.model('salary-logs', SalaryLogsSchema);