const { ObjectID } = require('mongodb');
const { Router } = require('express');
const User = require('../models/User');

const router = Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.newAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
