import { sessionsCollection } from '../databases/db.js';

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(400).send({ message: 'Formato de cabeçalho inesperado! Campo "Authorization" não encontrado.' });
    return;
  }

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      res.status(401).send({ message: 'Entre com sua conta!' });
      return;
    }

    res.locals.userId = session.userId;

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
    return;
  }

  next();

  return;
}