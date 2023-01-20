import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    type: Joi.boolean().required(),
    password: Joi.string().required(),
    phonenumber: Joi.string().required()
});

export const signinSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});