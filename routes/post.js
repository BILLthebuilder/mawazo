const { Router } = require('express');
const postMethods = require('../controllers/post');

const authenticate = require('../auth/auth');

const router = Router();

// Make a single post
router.post('/post', authenticate, postMethods.createPost);

// Get all posts
router.get('/posts', postMethods.getAll);

// Get a single post
router.get('/posts/:id', authenticate, postMethods.getAll);

// Create an endpoint to edit a post
router.patch('/posts/:id', authenticate, postMethods.editPost);

// Endpoint to delete a post
router.delete('/posts/:id', authenticate, postMethods.deletePost);

module.exports = router;
