const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Post = require('./post');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
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
        type: String,
        default: moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
});

UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});

UserSchema.statics.checkValidCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Wrong email, the user does not exist');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Wrong email/password combination');
    }

    return user;
};

UserSchema.methods.newAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;

    return userObj;
};

// hash the plain text password before saving
UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

UserSchema.pre('save', async function(next) {
    const user = this;
    User.find({ email: user.email }, function(err, docs) {
        if (!docs.length) {
            next();
        } else {
            console.log('Email exists');
            next(new Error('The email has been used, try another email'));
        }
    });
});

UserSchema.pre('remove', async function(next) {
    const user = this;
    await Post.deleteMany({ author: user._id });
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
