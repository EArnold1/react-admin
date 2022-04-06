const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//@route  POST api/adminAuth
//@desc   Login in admin
//access  Public
router.post(
    '/',
    [
        check('username', 'Incorrect username').not().isEmpty(),
        check('password', 'Incorrect password').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;

        try {
            //Check if user exists
            const user = await Admin.findOne({ username });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid email' }] });
            }

            //Check password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
            }

            //Get token from jwt
            payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) throw err;
                    return res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
);

module.exports = router;
