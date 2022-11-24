import joi from "joi";


export const signInModel = joi.object({
    email: joi.string().required().min(1),
    password: joi.required()
});