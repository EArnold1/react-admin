const express = require('express')
const router = express.Router()
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//@route  GET api/users
//@desc   Get all users
//access  private
router.get('/', auth, async (req, res) => {
    const usersBox = []
    try {
        const users = await User.find({}).sort({ date: -1 })
        users.forEach((data) => {
            usersBox.push({ id: data.id, firstname: data.firstname, lastname: data.lastname, email: data.email, access: data.access })
        })
        res.setHeader('Content-Range', 'bytes 0-10/100');
        res.json(usersBox);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }
})

//@route  POST api/admin
//@desc   Register admin
//access  Public
router.post(
    '/',
    [
        check('name', 'input name').not().isEmpty(),
        check('username', 'input username').not().isEmpty(),
        check('password', 'input password').isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, username, password } = req.body;

        try {
            let user = await Admin.findOne({ username });

            if (user) {
                return res.status(400).json({ error: 'User already exists' });
            }

            user = new Admin({
                name,
                password,
                username,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

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
                    return res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
);



module.exports = router