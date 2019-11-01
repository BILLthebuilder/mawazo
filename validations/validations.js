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

const userEditSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(50),
    age: Joi.number()
        .min(13)
        .max(101),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,32}$/)
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
        .min(3)
        .max(50)
        .required(),
    description: Joi.string()
        .min(3)
        .required()
});

const postEditSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(50),
    description: Joi.string().min(3)
});

const commentSchema = Joi.object({
    comment: Joi.string().required()
});
const commentEditSchema = Joi.object({
    comment: Joi.string()
});
module.exports = {
    userSchema,
    userLoginSchema,
    userEditSchema,
    postSchema,
    postEditSchema,
    commentSchema,
    commentEditSchema
};
