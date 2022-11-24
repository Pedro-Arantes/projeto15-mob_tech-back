import joi from 'joi';

export const productSchema = joi.object({
  model: joi.string().min(3).required(),
  version: joi.string().min(3).required(),
  price: joi.number().greater(0).required(),
  reviews: joi.number().min(1.0).max(5.0),
  featuredProduct: joi.string().valid('true', 'false').required(),
  image_URL: joi.string().uri().trim().required(),
});