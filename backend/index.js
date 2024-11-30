const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AdminModel = require('./models/Admins.js');
const EmployeeModel = require('./models/Employees.js');
const connectDB = require('./config/database.js');
const { authEmp } = require('./middleware/authEmp.js')
const { authAdmin } = require('./middleware/authAdmin.js')


const app = express();
connectDB();

// Init middleware???
app.use(express.json({ extended: false }))


app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["POST", "GET"],
    credentials: true
}))

// app.use(cors())

app.use(cookieParser());


app.get('/emp', authEmp, (req, res) => {
    return res.json({ msg: 'Success'});
})

app.get('/logout', (req, res) => {
    res.clearCookie('jwtTokenEmployees');
    return res.json({ msg: 'Success'});
})

app.get('/admin', authAdmin, (req, res) => {
    return res.json({ msg: 'Success'});
})

app.get('/logoutAdmin', (req, res) => {
    res.clearCookie('jwtTokenAdmins');
    return res.json({ msg: 'Success'});
})




// routes
app.use('/api/employees', require('./routes/api/employees.js'));
app.use('/api/admins', require('./routes/api/admin.js'));
app.use('/api/profile', require('./routes/api/profiles.js'));
app.use('/api/auth', require('./routes/api/authRoute.js'));


// test connection
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} lmao`);
});