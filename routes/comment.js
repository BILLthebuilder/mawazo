const { Router } = require('express');
const authenticate = require('../auth/auth');
const commentMethods = require('../controllers/comment');

const router = Router();

// Comments api endpoint
// Create an endpoint to post a comment
router.post('/posts/:id/comment', authenticate, commentMethods.createComment);

// Get all the comments related to the post
router.get('/posts/:id/comment', commentMethods.getAllComments);

module.exports = router;
