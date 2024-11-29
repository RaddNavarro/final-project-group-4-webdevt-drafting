const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Employee = require('../../models/Employees')
const Profile = require('../../models/Profile');
// @route   GET api/profile/me
// @desc    Test route
// @access  Public

router.get('/me', auth, async (req, res) => {
    try {
    // get fields from employees
        const profile = await Profile.findOne({ employees: req.employees.id }).populate('employees',
            ['email', 'password']
        );

        if (!profile) {
            return res.json('There is no profile for this user');
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.send('Server error'); 
    }
});

module.exports = router;