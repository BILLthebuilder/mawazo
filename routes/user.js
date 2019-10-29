const { ObjectID } = require('mongodb');
const { Router } = require('express');
const User = require('../models/User');
const authenticate = require('../auth/auth');

const router = Router();

// Create a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.newAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// Login a registered user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.checkValidCredentials(req.body.email, req.body.password);
        const token = await user.newAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
