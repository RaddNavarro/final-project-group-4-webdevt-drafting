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
const LeaveRequestModel = require('../../models/LeaveRequests');
const EmployeeModel = require('../../models/Employees');


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
check('hoursWorked', 'Total Hours Worked is required').not().isEmpty(),
check('hoursWorked', 'Numbers only').isNumeric(),
check('hourlyRate', 'Hourly Rate is required').not().isEmpty(),
check('hourlyRate', 'Numbers only').isNumeric(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });

    }

    let {
        hoursWorked,
        hourlyRate,
        grossPay,
        deductions,
        netPay,
        basicSalary
    } = req.body;

    const maxHours = 171.2;
    const minHours = 160;
    let overtimePay = 0;
    let overtimeHours = 0;
    let tempGrossPay = 0;
    var multiplicator = Math.pow(10, 2);

    //check for overtime
    if (hoursWorked <= maxHours) {

        // check if employee didn't get withing avg working hours per month
        if (hoursWorked < minHours) {

            grossPay = hoursWorked * hourlyRate;
            let annGrossPay = 0;


            // getting annual gross pay
            annGrossPay = grossPay * 12;

            // income tax
            if (annGrossPay > 250000 && annGrossPay <= 400000) {
                deductions = ((annGrossPay * 0.15) / 12);
            } else if (annGrossPay > 400000 && annGrossPay <= 800000) {
                deductions = (((annGrossPay * 0.20) + 22500) / 12);
            } else if (annGrossPay > 800000 && annGrossPay <= 2000000) {
                deductions = (((annGrossPay * 0.25) + 102500) / 12);
            } else if (annGrossPay > 2000000 && annGrossPay <= 8000000) {
                deductions = (((annGrossPay * 0.30) + 402500) / 12);
            } else if (annGrossPay > 8000000) {
                deductions = (((annGrossPay * 0.35) + 2202500) / 12);
            }

            basicSalary = ((minHours * hourlyRate) * 0.4);

            // SSS deductions
            deductions = deductions + (grossPay * 0.045);

            // philhealth deductions
            if (basicSalary > 10000 && basicSalary < 100000) {
                deductions = deductions + (basicSalary * 0.05);
            }

            // pag-ibig deductions
            if (grossPay > 1500) {
                deductions = deductions + (grossPay * 0.02);
            } else {
                deductions = deductions + (grossPay * 0.01);
            }

            deductions = parseFloat((deductions * multiplicator).toFixed(11));
            deductions = (Math.round(deductions) / multiplicator).toFixed(2);

            grossPay = parseFloat((grossPay * multiplicator).toFixed(11));
            grossPay = (Math.round(grossPay) / multiplicator).toFixed(2);


            // compute for netPay
            netPay = grossPay - deductions;
            netPay = parseFloat((netPay * multiplicator).toFixed(11));
            netPay = (Math.round(netPay) / multiplicator).toFixed(2);


        } else {
            grossPay = hoursWorked * hourlyRate;
            let annGrossPay = 0;


            // getting annual gross pay
            annGrossPay = grossPay * 12;

            // income tax
            if (annGrossPay > 250000 && annGrossPay <= 400000) {
                deductions = ((annGrossPay * 0.15) / 12);
            } else if (annGrossPay > 400000 && annGrossPay <= 800000) {
                deductions = (((annGrossPay * 0.20) + 22500) / 12);
            } else if (annGrossPay > 800000 && annGrossPay <= 2000000) {
                deductions = (((annGrossPay * 0.25) + 102500) / 12);
            } else if (annGrossPay > 2000000 && annGrossPay <= 8000000) {
                deductions = (((annGrossPay * 0.30) + 402500) / 12);
            } else if (annGrossPay > 8000000) {
                deductions = (((annGrossPay * 0.35) + 2202500) / 12);
            }

            basicSalary = (grossPay * 0.4);

            // SSS deductions
            deductions = deductions + (grossPay * 0.045);

            // philhealth deductions
            if (basicSalary > 10000 && basicSalary < 100000) {
                deductions = deductions + (basicSalary * 0.05);
            }

            // pag-ibig deductions
            if (grossPay > 1500) {
                deductions = deductions + (grossPay * 0.02);
            } else {
                deductions = deductions + (grossPay * 0.01);
            }

            // // deductions = parseFloat((deductions * multiplicator).toFixed(11));
            // // deductions = (Math.round(deductions) / multiplicator).toFixed(2);

            grossPay = parseFloat((grossPay * multiplicator).toFixed(11));
            grossPay = (Math.round(grossPay) / multiplicator).toFixed(2);

            // compute for netPay
            netPay = grossPay - deductions;
            netPay = parseFloat((netPay * multiplicator).toFixed(11));
            netPay = (Math.round(netPay) / multiplicator).toFixed(2);

        }
    } else {
        // including overtime
        overtimeHours = hoursWorked - maxHours;

        grossPay = maxHours * hourlyRate;
        overtimePay = overtimeHours * (hourlyRate * 1.25);
        grossPay = grossPay + overtimePay;
        let annGrossPay = 0;


        // getting annual gross pay
        annGrossPay = grossPay * 12;

        // income tax
        if (annGrossPay > 250000 && annGrossPay <= 400000) {
            deductions = ((annGrossPay * 0.15) / 12);
        } else if (annGrossPay > 400000 && annGrossPay <= 800000) {
            deductions = (((annGrossPay * 0.20) + 22500) / 12);
        } else if (annGrossPay > 800000 && annGrossPay <= 2000000) {
            deductions = (((annGrossPay * 0.25) + 102500) / 12);
        } else if (annGrossPay > 2000000 && annGrossPay <= 8000000) {
            deductions = (((annGrossPay * 0.30) + 402500) / 12);
        } else if (annGrossPay > 8000000) {
            deductions = (((annGrossPay * 0.35) + 2202500) / 12);
        }

        basicSalary = (grossPay * 0.4);

        // SSS deductions
        deductions = deductions + (grossPay * 0.045);

        // philhealth deductions
        if (basicSalary > 10000 && basicSalary < 100000) {
            deductions = deductions + (basicSalary * 0.05);
        }

        // pag-ibig deductions
        if (grossPay > 1500) {
            deductions = deductions + (grossPay * 0.02);
        } else {
            deductions = deductions + (grossPay * 0.01);
        }

        deductions = parseFloat((deductions * multiplicator).toFixed(11));
        deductions = (Math.round(deductions) / multiplicator).toFixed(2);

        grossPay = parseFloat((grossPay * multiplicator).toFixed(11));
        grossPay = (Math.round(grossPay) / multiplicator).toFixed(2);

        // compute for netPay
        netPay = grossPay - deductions;
        netPay = parseFloat((netPay * multiplicator).toFixed(11));
        netPay = (Math.round(netPay) / multiplicator).toFixed(2);

    }


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
    SalaryFields.basicSalary = basicSalary;

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


        res.send(salary);

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});


router.delete('/delete', async (req, res) => {

    try {


        // rEMOVE employee
        await Employees.findOneAndDelete({ _id: req.body.id });
        // remove their salary log
        await SalaryLogs.findOneAndDelete({ employees: req.body.id });

        res.json({ msg: 'Employee deleted' });

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});

router.get('/leave-requests', async (req, res) => {

    try {
        // get fields from employees
        const leave = await LeaveRequestModel.find().populate('employees', ['firstName', 'lastName']);

        res.json(leave);

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }

})

router.post('/leave-requests/edit', [check('leaveStatus', 'Status Required').not().isEmpty()], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });

    }

    const leaves = await LeaveRequestModel.findOne({ _id: req.body.id });

    if (!leaves) {
        return res.json({ msg: 'There is no leave request yet' })
    }

    const { leaveStatus } = req.body;

    const LeaveField = {};
    // making the leave request object
    LeaveField.numDays = leaves.numDays;
    LeaveField.startDate = leaves.startDate;
    LeaveField.endDate = leaves.endDate;
    LeaveField.leaveType = leaves.leaveType;
    LeaveField.dateIssued = leaves.dateIssued;
    if (leaveStatus) LeaveField.leaveStatus = leaveStatus

    try {
        // get fields from employees
        let leave = await LeaveRequestModel.findOne({ _id: req.body.id }).populate('employees', ['firstName', 'lastName']);




        if (leave) {
            leave = await LeaveRequestModel.findOneAndUpdate(
                { _id: leave.id },
                { $set: LeaveField },
                { new: true }
            );

            return res.json(leave);
        }
        await leave.save();
        res.json(leave);

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }

})

router.post('/edit-employee', async (req, res) => {

    const employees = await EmployeeModel.findOne({ _id: req.body.id })

    const {
        firstName,
        lastName,
        contactNum,
        address
    } = req.body;

    const employeeFields = {};
    // making the employee object
    employeeFields.email = employees.email;
    employeeFields.password = employees.password;
    employeeFields.firstName = firstName;
    employeeFields.lastName = lastName;
    employeeFields.contactNum = contactNum;
    employeeFields.address = address;

    try {
        let employee = await Employees.findOne({ _id: req.body.id })

        if (employee) {
            // updating the employee
            employee = await Employees.findOneAndUpdate(
                { _id: employee.id },
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

router.get('/edit/:id', async (req, res) => {
    
    try {
        const employee = await Employees.findById(req.params.id)

        
        res.json(employee);

    } catch (error) {

        console.error(error.message);
        res.send('Server Error')
    }

}

)

module.exports = router;