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

// Enable a user to view their own user profile details
router.get('/users/me', authenticate, async (req, res) => {
    res.send(req.user);
});

// Edit user profile details
router.patch('/users/edit/me', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    const { _id } = req.user;

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid request' });
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        updates.forEach(update => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send();
    }
});

// Delete user endpoint
router.delete('/users/delete/me', authenticate, async (req, res) => {
    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send();
    }

    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

// Logout the user and destroy the jwt
router.post('/users/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

// Logout every user and destroy all tokens

module.exports = router;
