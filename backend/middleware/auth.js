const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get  token from header
    // const token = req.header('x-auth-token');

    // get token from cookie
    const token = req.cookies.jwtTokenEmployees;

    // Check if no token 
    if (!token) {
        // res.redirect('/loginAs');
        // change it later to just a string if it errors
        return res.json({ msg: 'No token, authorization denied'});
    }

    // Verify token
    try {
        // decode the token
        const decode = jwt.verify(token, config.get('jwtTokenEmployees'));

        req.employees = decode.employees;
        next();

    } catch (error) {
        // change it later to just a string if it errors
        // res.redirect('/loginAs');
        res.json({ msg: 'Token is not valid'})
    }
}