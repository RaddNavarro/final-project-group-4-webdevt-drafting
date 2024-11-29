const jwt = require('jsonwebtoken');
const config = require('config');

const authAdmin = (req, res, next) => {
    // Get  token from header
    // const token = req.header('x-auth-token');

    // get token from cookie
    const token = req.cookies.jwtTokenAdmins;
    
    // Check if no token 
    if (!token) {
        // change it later to just a string if it errors
        return res.json({ msg: 'No token, authorization denied'});
    }

    // Verify token
    try {
        // decode the token
        const decode = jwt.verify(token, config.get('jwtTokenAdmins'));

        req.admins = decode.admins;
       
        next();

    } catch (error) {
        // change it later to just a string if it errors
        return res.json({ msg: 'Token is not valid'})
    }
}

module.exports = { authAdmin };