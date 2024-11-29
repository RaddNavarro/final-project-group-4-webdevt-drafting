const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


const { check, validationResult } = require('express-validator');

const Employees = require('../../models/Employees');



// @route   GET api/auth-employee
// @desc    Test route
// @access  Public

router.get('/', auth, async (req, res) => {
    try {

        res.json({ msg: 'logged in '})

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }
});


router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
    // check('password', 'Please enter a password with at least one upper').isUppercase()
    // check('password', 'Please enter a password with at least one number').isAlphanumeric(),
    // check('password', 'Please enter a strong password: At least one upper, lower, special character and number').isStrongPassword({ minUppercase: 1, minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
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
            { expiresIn: "3h" });

        res.cookie('jwtTokenEmployees', token);
        res.json({ token })
        

    } catch (error) {
        console.error(error.message);
        res.send('Server error');
    }


}
);

module.exports = router;