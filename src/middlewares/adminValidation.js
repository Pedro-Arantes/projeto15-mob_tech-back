import bcrypt from 'bcrypt';

import { adminsCollection } from '../databases/db.js';

export async function adminValidation(req, res, next) {

  const { admin, password } = req.headers;

  if (!admin || !password) {
    res.status(400).send({ message: 'Formato de cabeçalho inesperado! Campo "AdminName e/ou Password" não encontrado(s).' });
    return;
  }

  try {
    const adminExists = await adminsCollection.findOne({ adminName: admin });
    
    if (!adminExists) {
      res.status(404).send({ message: 'Administrador não encontrado!' });
      return;
    }

    const passwordOk = bcrypt.compareSync(password, adminExists.password);

    if (!passwordOk) {
      res.status(401).send({ message: 'AdminName e/ou Password inválido(s)!' });
      return;
    }

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
    return;
  }

  next();

  return;
}