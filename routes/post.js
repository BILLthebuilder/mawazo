const { ObjectID } = require('mongodb');
const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../auth/auth');

const router = Router();

// Make a single post
router.post('/post', authenticate, async (req, res) => {
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

// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
