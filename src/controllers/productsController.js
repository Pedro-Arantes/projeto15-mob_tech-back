import { productsCollection } from '../databases/db.js';

export async function getProducts(req, res) {

  const questions = (req.query.q.split(' ')
    .filter(term => term.length > 2)
    .map(term => new RegExp(term, 'i')));
  
  if (questions.length === 0) {
    questions.push(new RegExp())
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
    res.status(200).send(productsSearch);

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