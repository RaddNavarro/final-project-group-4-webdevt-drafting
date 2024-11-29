const mongoose = require('mongoose');

const SalaryLogsSchema = new mongoose.Schema({
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registers-employee'
    },
    hoursWorked: {
        type: Number
    },
    hourlyRate: {
        type: Number
    },
    grossPay: {
        type: Number
    },
    deductions: {
        type: Number
    },
    netPay: {
        type: Number
    }
})

module.exports = SalaryLogs = mongoose.model('salary-logs', SalaryLogsSchema);