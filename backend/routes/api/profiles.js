const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')

const Employee = require('../../models/Employees')
const Profile = require('../../models/Profile');


// @route   GET api/profile/me
// @desc    Test route
// @access  Private

router.get('/me', auth, async (req, res) => {
    try {
    // get fields from employees
        const profile = await Employee.findOne({ employees: req.employees.id }).populate('employees',
            ['email']
        );

        if (!profile) {
            return res.json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.send('Server error'); 
    }
});

router.post('/', [auth, [check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('contactNum', 'Contact is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty()
    ]
    ], async (req, res) => {
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

        const profileFields = {};
        // making the profile object
        profileFields.employees = req.employees.id;
        if (firstName) profileFields.firstName = firstName;
        if (lastName) profileFields.lastName = lastName;
        if (contactNum) profileFields.contactNum = contactNum;
        if (address) profileFields.address = address;

        try {
            let profile = await Profile.findOne({ employees: req.employees.id })

            if (profile) {
                // updating the profile
                profile = await Profile.findOneAndUpdate(
                    { employees: req.employees.id },
                    { $set: profileFields },
                    { new: true }
                );
                
                return res.json(profile);
            }

            // creating the profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.send('Server Error')
        }

    }

)

router.get('/all', async (req, res) => {
    try {
    // get fields from employees
        const profile = await Profile.find().populate('employees',
            ['email']
        );


        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.send('Server error'); 
    }
});

module.exports = router;