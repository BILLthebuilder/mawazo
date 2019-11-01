const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    age: Joi.number()
        .min(13)
        .max(101)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,32}$/)
        .required()
});

const userLoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,32}$/)
        .required()
});

const postSchema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    description: Joi.string
        .alphanum()
        .min(3)
        .required()
});

const commentSchema = Joi.object({
    comment: Joi.string()
        .alphanum()
        .required()
});

module.exports = {
    userSchema,
    postSchema,
    commentSchema,
    userLoginSchema
};
