import { productsCollection } from '../databases/db.js';

export async function getProducts(req, res) {
  try {
    const products = await productsCollection.find().toArray();
    res.status(200).send(products);

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