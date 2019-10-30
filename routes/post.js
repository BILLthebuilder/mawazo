const { Router } = require('express');
const { ObjectID } = require('mongodb');
const Post = require('../models/post');
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

// Get a single post
router.get('/posts/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const post = await Post.findOne({ _id, author: req.user._id });
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (error) {
        res.status(500).send();
    }
});

// Create an endpoint to edit a post
router.patch('/posts/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'title'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates' });
    }
    if (!ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const post = await Post.findOne({ _id: req.params.id, author: req.user._id });

        if (!post) {
            res.status(404).send();
        }

        updates.forEach(update => (post[update] = req.body[update]));
        await post.save();

        res.send(post);
    } catch (error) {
        res.status(400).send();
    }
});

// Endpoint to delete a post
router.delete('/posts/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const deletepost = await Post.findOneAndDelete({ _id, author: req.user._id });
        if (!deletepost) {
            return res.status(404).send();
        }
        res.send(deletepost);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
