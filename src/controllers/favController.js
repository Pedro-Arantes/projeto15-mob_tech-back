import { favoritesCollection } from '../databases/db.js';

export async function getFav(req, res) {
  const userId = res.locals.userId

  try {

    const favorites = await favoritesCollection.find({ userId: userId }).toArray();
    res.status(200).send(favorites.map(favorite => {
      favorite.id = favorite.productId;
      delete favorite._id;
      delete favorite.userId;
      return favorite;
    }));

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}

export async function postFav(req, res) {
  const product = res.locals.product;
  const userId = res.locals.userId;
  const favId = res.locals.favId;

  if (favId) {
    res.status(409).send({ message: 'Este produto já está nos favoritos!' });
    return;
  }

  try {
    await favoritesCollection.insertOne({ ...product, userId: userId });
    res.status(201).send({ message: 'Registro criado com sucesso!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}

export async function deleteFav(req, res) {
  const favId = res.locals.favId;

  try {

    await favoritesCollection.deleteOne({ _id: favId });
    res.status(200).send({ message: 'Registro deletado com sucesso!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}