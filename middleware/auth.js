const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('auth-token');

    //Check for token
    if (!token) {
        return res.status(401).json({ msg: 'Not Authorized' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }
};
