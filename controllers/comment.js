const { ObjectID } = require('mongodb');
const Joi = require('@hapi/joi');

const Post = require('../models/post');
const Comment = require('../models/comment');
const { commentSchema } = require('../validations/validations');

const commentMethods = {
    async createComment(req, res) {
        const { error } = Joi.validate(req.body, commentSchema);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message
            });
        }
        const _id = req.params.id;
        const userid = req.user._id;

        if (!ObjectID.isValid(_id)) {
            return res.status(404).send({ error: 'user not found' });
        }
        if (!ObjectID.isValid(userid)) {
            return res.status(404).send();
        }
        const comment = new Comment({
            ...req.body,
            author: userid,
            postId: _id
        });
        try {
            await comment.save();
            res.status(201).send(comment);
        } catch (err) {
            res.status(400).send(err.message);
        }
    },
    async getAllComments(req, res) {
        try {
            const post = await Post.findOne({ _id: req.params.id });
            await post.populate('comments').execPopulate();
            res.send(post.comments);
        } catch (error) {
            res.status(500).send();
        }
    }
};

module.exports = commentMethods;
