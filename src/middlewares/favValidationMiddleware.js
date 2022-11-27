import { ObjectId } from 'mongodb';
import { favoritesCollection, productsCollection } from '../databases/db.js';

export async function favValidation(req, res, next) {
  const productId = req.params.id;
  const userId = res.locals.userId;

  try {

    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      res.status(404).send({ message: 'Produto não encontrado!' });
      return;
    }

    const [ favorite ] = await favoritesCollection.find(
      {
        $and: [
          { "userId": userId },
          { "productId": new ObjectId(productId) }
        ]
      }
    ).toArray();

    if (favorite && !favorite.userId.equals(userId)) {
      res.status(403).send({ message: 'Operação não permitida!' });
      return;
    }

    product.productId = product._id;
    delete product._id;
    delete product.featuredProduct;
    res.locals.product = product;
    res.locals.favId = favorite?._id;

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
    return;
  }

  next();

  return;
}