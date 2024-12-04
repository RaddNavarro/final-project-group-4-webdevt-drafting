const mongoose = require('mongoose');

const LeaveRequestsSchema = new mongoose.Schema({
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registers-employees'
    },
    leaveType: {
        type: String,
        required: true
    },
    dateIssued: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    numDays: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
})
    

const LeaveRequestModel = mongoose.model("attendance", LeaveRequestsSchema);

module.exports = LeaveRequestModel;