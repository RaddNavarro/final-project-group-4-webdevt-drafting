const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// get employee db
const Employees = require('../../models/Employees');


// @route   GET api/employees
// @desc    Register employees
// @access  Public

router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    // check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    // check('password', 'Please enter a password with at least one upper').isUppercase()
    // check('password', 'Please enter a password with at least one number').isAlphanumeric(),
    check('password', 'Please enter a strong password: At least one upper, lower, special character and number').isStrongPassword({ minUppercase: 1, minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.json(errors);
    }

    const { email, password } = req.body;

    try {

        let employees = await Employees.findOne({ email });

        if (employees) {
           return res.json({ errors: [{ msg: 'User already exists' }] });
        }

        // make employees object
        employees = new Employees({
            email,
            password
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

module.exports = router;