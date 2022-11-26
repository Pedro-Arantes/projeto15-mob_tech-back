import { sessionsCollection, usersCollection } from '../databases/db.js';
import bcrypt from 'bcrypt';

export async function postSignUp(req, res) {
  const ROUNDS = 12;
  const user = res.locals.user;
  const hashPassword = bcrypt.hashSync(user.password, ROUNDS);

  try {
    await usersCollection.insertOne({ ...user, password: hashPassword, imageURL:'' });
    res.status(201).send({ message: 'Usuário criado com sucesso!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}