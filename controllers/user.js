const { ObjectID } = require('mongodb');
const Joi = require('@hapi/joi');

const User = require('../models/user');
const { userSchema, userLoginSchema, userEditSchema } = require('../validations/validations');

const userMethods = {
    async signup(req, res) {
        const { error } = Joi.validate(req.body, userSchema);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message
            });
        }
        const user = new User(req.body);
        try {
            const token = await user.newAuthToken();
            res.status(201).send({ user, token });
        } catch (e) {
            // Check if a duplicate email error is returned
            if (!e.message.includes('E11000 duplicate key error collection:')) {
                return res.status(400).send({ Error: 'Bad request' });
            }
            res.status(400).send({ Error: 'The email already exists' });
        }
    },
    async login(req, res) {
        const { error } = Joi.validate(req.body, userLoginSchema);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message
            });
        }
        try {
            const user = await User.checkValidCredentials(req.body.email, req.body.password);
            const token = await user.newAuthToken();
            if (user) {
                res.send({ user, token });
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
    },
    async viewUser(req, res) {
        res.send(req.user);
    },
    async editUser(req, res) {
        const { error } = Joi.validate(req.body, userEditSchema);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message
            });
        }
        const { _id } = req.user;
        if (!ObjectID.isValid(_id)) {
            return res.status(404).send({ message: 'user not found' });
        }

        try {
            await req.user.save();
            res.send(req.user);
        } catch (err) {
            res.status(400).send(err.message);
        }
    },
    async deleteUser(req, res) {
        if (!ObjectID.isValid(req.user._id)) {
            return res.status(404).send({ message: 'user not found!' });
        }

        try {
            await req.user.remove();
            res.send(req.user);
        } catch (error) {
            res.status(500).send(error.message);
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
