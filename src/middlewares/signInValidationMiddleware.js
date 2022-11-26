import { usersCollection } from '../databases/db.js';
import bcrypt from 'bcrypt';

export async function signInValidation(req, res, next) {
  const { email, password } = res.locals.user;

  try {
    const userExists = await usersCollection.findOne({ email: email });
    if (!userExists) {
      res.status(404).send({ message: 'Usuário não encontrado! Cadastre-se.' });
      return;
    }

    const passwordOk = bcrypt.compareSync(password, userExists.password);

    if (!passwordOk) {
      res.status(401).send({ message: 'Email e/ou senha inválido! Tente novamente.' });
      return;
    }

    res.locals.user = userExists;

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
    return;
  }

  next();

  return;
}