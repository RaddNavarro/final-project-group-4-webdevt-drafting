const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


const { check, validationResult } = require('express-validator');

const Employees = require('../../models/Employees');
const Admins = require('../../models/Admins');


// @route   GET api/auth/employee
// @desc    Auth route
// @access  Public

router.get('/employee', auth, async (req, res) => {
    try {

        res.json({ msg: 'logged in '})

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});

// @route   POST api/auth/employee
// @desc    Check route
// @access  Public

router.post('/employee', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.json(errors);
    }

    const { email, password } = req.body;

    try {

        let employees = await Employees.findOne({ email });

        // if user not found
        if (!employees) {
            return res.json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }

        // check if the password matches with the encrypted password in the database
        const isMatch = await bcrypt.compare(password, employees.password);

        if (!isMatch) {
            return res.json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }

        const payload = {
            employees: {
                id: employees.id
            }
        }
        
        const token = jwt.sign(
            payload,
            config.get('jwtTokenEmployees'),
            { expiresIn: "1h" });

        res.cookie('jwtTokenEmployees', token);
        res.json({ token })
        

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }


}
);


// @route   GET api/auth/admin
// @desc    Auth route
// @access  Public

router.get('/admin', auth, async (req, res) => {
    try {

        res.json({ msg: 'logged in '})

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});

// @route   POST api/auth/admin
// @desc    Check route
// @access  Public

router.post('/admin', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.json(errors);
    }

    const { email, password } = req.body;

    try {

        let admins = await Admins.findOne({ email });

        // if user not found
        if (!admins) {
           return res.json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }

        // check if the password matches with the encrypted password in the database
        const isMatch = await bcrypt.compare(password, admins.password);

        if (!isMatch) {
            return res.json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }

        const payload = {
            admins: {
                id: admins.id
            }
        }

        const token = jwt.sign(
            payload,
            config.get('jwtTokenAdmins'),
            { expiresIn: "1h" });

        res.cookie('jwtTokenAdmins', token);
        res.json({ token })

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }

    }
);

module.exports = router;