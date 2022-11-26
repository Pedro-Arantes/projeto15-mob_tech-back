import { cartSchema } from '../models/cartModel.js';

export function cartSchemaValidation(req, res, next) {
  const cart = req.body;
  const headers = req.headers

  const { error } = cartSchema.validate(cart, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: 'Requisição com formato errado ', errors: errors });
    return;
  }

  req.cart = cart;
  req.headers = headers;

  next();

  return;
}