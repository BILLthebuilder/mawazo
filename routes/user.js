const { Router } = require('express');
const userMethods = require('../controllers/user');
const authenticate = require('../auth/auth');

const router = Router();

// Create a new user
router.post('/users/signup', userMethods.signup);

// Login a registered user
router.post('/users/login', userMethods.login);

// Enable a user to view their own user profile details
router.get('/users/me', authenticate, userMethods.viewUser);

// Enable an admin to view all the user details
router.get('/users/all', /* authenticate, */ userMethods.viewAllUsers);

// Edit user profile details
router.patch('/users/edit/me', authenticate, userMethods.editUser);

// Delete user endpoint
router.delete('/users/delete/me', authenticate, userMethods.deleteUser);

// Logout the user and destroy the jwt
router.post('/users/logout', authenticate, userMethods.logoutUser);

// Logout every user and destroy all tokens
// This endpoint is for purposes of testing only
router.post('/users/logoutall', authenticate, userMethods.logoutAll);

module.exports = router;
