import joi from 'joi';

export const cartSchema = joi.object({
    model: joi.string().min(3).required(),
    price: joi.string().min(3).required(),
    img: joi.string().min(3).required(),
    amount: joi.number().greater(0).required(),
});