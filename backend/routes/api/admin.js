const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// get admin db
const Admins = require('../../models/Admins');
const Employees = require('../../models/Employees');
const SalaryLogsSchema = require('../../models/SalaryLogs');


// @route   GET api/admins
// @desc    Register admins
// @access  Public

router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a strong password: At least one upper, lower, special character and number').isStrongPassword({ minUppercase: 1, minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.json(errors);
    }

    const { email, password } = req.body;

    try {

        let admins = await Admins.findOne({ email });

        if (admins) {
           return res.json('User already exists');
        }

        // make employees object
        admins = new Admins({
            email,
            password
        });

        // encrypting the password

        // create salt
        const salt = await bcrypt.genSalt(10);

        // generating the hash which takes the password and the salt to make the has
        admins.password = await bcrypt.hash(password, salt)

        await admins.save();

        const payload = {
            admins: {
                id: admins.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtTokenAdmins'),
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

router.post('/generate', [check('email', 'Email is required').not().isEmpty(),
    check('hoursWorked', 'Hours Worked is required').not().isEmpty(),
    check('hoursWorked', 'Numbers only').isNumeric(),
    check('hourlyRate', 'Hourly Rate is required').not().isEmpty(),
    check('hourlyRate', 'Numbers only').isNumeric(),
], async (req, res) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });

        }

        const {
            hoursWorked,
            hourlyRate,
            grossPay,
            deductions,
            netPay
        } = req.body;
        // finding the employee in the employees table
        let employees = await Employees.findOne({ email: req.body.email });
        
        const SalaryFields = {};
        // making the salary object
        SalaryFields.employees = employees.id;
        if (hoursWorked) SalaryFields.hoursWorked = hoursWorked;
        if (hourlyRate) SalaryFields.hourlyRate = hourlyRate;
        SalaryFields.grossPay = grossPay;
        SalaryFields.deductions = deductions;
        SalaryFields.netPay = netPay;

        try {
            let salary = await SalaryLogsSchema.findOne({ employees: employees.id });

            if (salary) {
                salary = await SalaryLogsSchema.findOneAndUpdate(
                    { employees: employees.id },
                    { $set: SalaryFields },
                    { new: true }
                );
                
                return res.json(salary);
            }

            salary = new SalaryLogsSchema(SalaryFields);

            await salary.save();
            res.json(salary);
            


        } catch (error) {
            console.error(error.message);
            res.send('Server Error')
        }


})

router.get('/salary', async (req, res) => {
    try {
    // get fields from employees
        const salary = await SalaryLogsSchema.find().populate('employees', ['email', 'firstName', 'lastName']);

       
        res.json(salary);
        
    } catch (error) {
        console.error(error.message);
        res.send('Server error'); 
    }
});

module.exports = router;