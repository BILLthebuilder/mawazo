const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your password!');
            } else if (validator.equals(value.toLowerCase(), 'password')) {
                throw new Error('Password is invalid!');
            } else if (validator.contains(value.toLowerCase(), 'password')) {
                throw new Error('Password should not contain password!');
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

UserSchema.methods.newAuthToken = async () => {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.SECRET, {
        expiresIn: '7 days'
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

// Hash our password before saving it in the db
UserSchema.pre('save', async next => {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

module.exports = User;
