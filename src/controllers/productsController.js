import { productsCollection } from '../databases/db.js';

export async function getProducts(req, res) {
  let questions;

  if (req.query.search) {
    questions = (req.query.search.split(' ')
      .filter(term => term.length > 1)
      .map(term => new RegExp(term, 'i')));
  } else {
    questions = [new RegExp()];
  }

  try {
    const productsSearch = await productsCollection.find(
      {
        $or: [
          { "model": { $in: questions } },
          { "version": { $in: questions } }
        ]
      }
    ).toArray();
    res.status(200).send(productsSearch.map(product => {
      product.id = product._id;
      delete product._id;
      return product;
    }));

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}

export async function postProducts(req, res) {

  const product = res.locals.product;

  try {
    await productsCollection.insertOne(product);
    res.status(201).send({ message: 'Registro criado com sucesso!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}