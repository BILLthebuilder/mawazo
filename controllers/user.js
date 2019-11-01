const { ObjectID } = require('mongodb');
const User = require('../models/user');

const userMethods = {
    async signup(req, res) {
        const user = new User(req.body);
        try {
            const token = await user.newAuthToken();
            res.status(201).send({ user, token });
        } catch (e) {
            res.status(400).send({ message: 'invalid request' });
            console.log(e);
        }
    },
    async login(req, res) {
        try {
            const user = await User.checkValidCredentials(req.body.email, req.body.password);
            const token = await user.newAuthToken();
            res.send({ user, token });
        } catch (error) {
            res.status(400).send();
        }
    },
    async viewUser(req, res) {
        res.send(req.user);
    },
    async editUser(req, res) {
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
    },
    async deleteUser(req, res) {
        if (!ObjectID.isValid(req.user._id)) {
            return res.status(404).send();
        }

        try {
            await req.user.remove();
            res.send(req.user);
        } catch (error) {
            res.status(500).send();
        }
    },
    async logoutUser(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter(token => {
                return token.token !== req.token;
            });
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send();
        }
    },
    async logoutAll(req, res) {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send();
        }
    }
};

module.exports = userMethods;
