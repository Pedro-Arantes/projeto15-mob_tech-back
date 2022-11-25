import { productSchema } from '../models/productModel.js';

export function productSchemaValidation(req, res, next) {
  const product = req.body;

  const { error } = productSchema.validate(product, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ message: 'Mensagem com formato inesperado! ', errors: errors });
    return;
  }

  res.locals.product = product;

  next();

  return;
}