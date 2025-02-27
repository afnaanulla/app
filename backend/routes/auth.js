/* const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateTokens = require('../utils/generateTokens');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const tokens = generateTokens(user._id);
    res.json(tokens);
});

module.exports = router;
 */



const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateTokens = require('../utils/generateTokens');

const router = express.Router();


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({
            message: 'Login unsuccessful: Incorrect username',
            success: false
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: 'Login unsuccessful: Incorrect password',
            success: false
        });
    }
    const tokens = generateTokens(user._id);
    res.json({
        message: 'Logged in successfully!',
        success: true,
        user: {
            userId: user._id,
            username: user.username,
            password: password,
            name: user.name
        },
        tokens
    });
});

module.exports = router;
