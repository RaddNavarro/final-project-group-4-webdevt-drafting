const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

// get employee db
const Employees = require('../../models/Employees');
const SalaryLogs = require('../../models/SalaryLogs');
const LeaveRequestModel = require('../../models/LeaveRequests');


// @route   GET api/employees
// @desc    Register employees
// @access  Public

router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a strong password: At least one upper, lower, special character and number').isStrongPassword({ minUppercase: 1, minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1 }),
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('contactNum', 'Contact is required').not().isEmpty(),
    check('contactNum', 'Contact is required').isNumeric(),
    check('address', 'Address is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.json(errors);
    }

    const { email, password, firstName, lastName, contactNum, address } = req.body;

    try {

        let employees = await Employees.findOne({ email });

        if (employees) {
            return res.json({ errors: [{ msg: 'User already exists' }] });
        }

        // make employees object
        employees = new Employees({
            email,
            password,
            firstName,
            lastName,
            contactNum,
            address
        });

        // encrypting the password

        // create salt
        const salt = await bcrypt.genSalt(10);

        // generating the hash which takes the password and the salt to make the has
        employees.password = await bcrypt.hash(password, salt)

        await employees.save();

        const payload = {
            employees: {
                id: employees.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtTokenEmployees'),
            { expiresIn: 360000 },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            });


    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }


}
);

router.post('/edit', [check('email', 'Email is required').not().isEmpty(),
check('firstName', 'First Name is required').not().isEmpty(),
check('lastName', 'Last name is required').not().isEmpty(),
check('contactNum', 'Contact is required').not().isEmpty(),
check('address', 'Address is required').not().isEmpty()
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });

        }

        const {
            firstName,
            lastName,
            contactNum,
            address
        } = req.body;

        const employeeFields = {};
        // making the employee object
        employeeFields.email = req.body.email;
        employeeFields.password = req.body.password;
        if (firstName) employeeFields.firstName = firstName;
        if (lastName) employeeFields.lastName = lastName;
        if (contactNum) employeeFields.contactNum = contactNum;
        if (address) employeeFields.address = address;

        try {
            let employee = await Employees.findOne({ email: req.body.email })

            if (employee) {
                // updating the employee
                employee = await Employees.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: employeeFields },
                    { new: true }
                );

                return res.json(employee);
            }

            // creating the employee
            employee = new Employees(employeeFields);

            await employee.save();
            res.json(employee);
        } catch (error) {
            res.json(employeeFields)
            console.error(error.message);
            res.send('Server Error')
        }

    }

)

router.get('/me', auth, async (req, res) => {
    try {
        // get fields from employees
        const profile = await Employees.findOne({ _id: req.employees.id });

        if (!profile) {
            //    return res.json(profile);
            return res.json({ msg: 'There is no profile for this user' });
        }

        res.send(profile);

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});

router.get('/all', async (req, res) => {
    try {
        // get fields from employees
        const employee = await Employees.find().populate();


        res.json(employee);

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});

router.get('/salary', auth, async (req, res) => {
    try {
        // get fields from salary logs collection
        const salary = await SalaryLogs.find({ employees: req.employees.id }).populate('employees', ['email', 'firstName', 'lastName']);

        res.send(salary);

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});

router.post('/leave', auth, [check('numDays', 'Number of days is required').not().isEmpty(),
check('numDays', 'Number of days must be a number').isNumeric(),
check('startDate', 'Start Date is required').not().isEmpty(),
check('endDate', 'End Date is required').not().isEmpty(),
check('leaveType', 'Leave Type is required').not().isEmpty(),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.send(errors);
    }

    const { numDays, startDate, endDate, leaveType, dateIssued } = req.body


    const LeaveField = {};
    // making the leave request object
    LeaveField.employees = req.employees.id;
    if (numDays) LeaveField.numDays = numDays;
    if (startDate) LeaveField.startDate = startDate;
    if (endDate) LeaveField.endDate = endDate;
    if (leaveType) LeaveField.leaveType = leaveType;
    if (dateIssued) LeaveField.dateIssued = dateIssued;


    try {



        const leave = new LeaveRequestModel(LeaveField)

        await leave.save()
        res.json({ msg: 'Request Sent'})

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});



module.exports = router;