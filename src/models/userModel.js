import joi from 'joi';

export const userSchemaSignUp = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required()
});

export const userSchemaSignIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});