const { Router } = require('express');
const userMethod = require('../controllers/user');
const authenticate = require('../auth/auth');

const router = Router();

// Create a new user
router.post('/users/signup', userMethod.signup);

// Login a registered user
router.post('/users/login', userMethod.login);

// Enable a user to view their own user profile details
router.get('/users/me', authenticate, userMethod.viewUser);

// Edit user profile details
router.patch('/users/edit/me', authenticate, userMethod.editUser);

// Delete user endpoint
router.delete('/users/delete/me', authenticate, userMethod.deleteUser);

// Logout the user and destroy the jwt
router.post('/users/logout', authenticate, userMethod.logoutUser);

// Logout every user and destroy all tokens
// This endpoint is for purposes of testing only
router.post('/users/logoutall', authenticate, userMethod.logoutAll);

module.exports = router;
