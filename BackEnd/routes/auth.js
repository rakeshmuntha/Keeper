const express = require('express')
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'rakeshisagoodb$oy';
const fetchuser = require('../middlewares/fetchuser');

// ROUTE 1: Create a user using POST /api/auth/createuser !No Login REQuired
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
],
    // if there are errors return bad requests and errors
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // check weather the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) return res.status(400).json({success, error: "Sorry the user with this mail exists" })

            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt)
            // creating a new user
            user = await User.create(
                {
                    name: req.body.name,
                    password: secpass,
                    email: req.body.email
                }
            )
            const data = {
                user: {
                    id: user.id
                }
            }
            // using jwt to ensure the verified user revisits the site, the jwt returns a tokens using that token and the secret key we will know the user is a authenticated user or not
            const authToken = jwt.sign(data, JWT_SECRET);
            // adding this user to our response
            success = true;
            res.json({success, authToken });
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    })

// ROUTE 2:  Authenticate a user using POST /api/auth/login !No Login REQuired
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be below 5 digits').isLength({ min: 5 }),
],
    // if there are errors return bad requests and errors
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Please try to login with correct credentials' });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
            }
            // if id and password is correct
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // adding this user to our response
            success = true;
            res.json({ success, authToken });
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    })

// ROUTE 3: Get loggedin user details using: POST /api/auth/getuser !Login REQuired
router.post('/getuser', fetchuser,
    async (req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password');
            res.send(user);
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    })



module.exports = router