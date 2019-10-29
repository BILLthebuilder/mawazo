const { ObjectID } = require('mongodb');
const { Router } = require('express');
const Post = require('../models/Post');

const router = Router();

router.post('/posts', authenticate, async (req, res) => {
    const post = new Post({
        ...req.body,
        author: req.user._id
    });
    try {
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = routes;
