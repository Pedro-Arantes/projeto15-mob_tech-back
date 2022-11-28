import { sessionsCollection } from '../databases/db.js';
import { v4 as uuid } from 'uuid';

export async function postSignIn(req, res) {
  const user = res.locals.user;
  const token = uuid();

  try {
    await sessionsCollection.updateOne(
      { userId: user._id }, 
      { $set: { userId: user._id, token: token }},
      { upsert: true }
    );
    res.status(200).send({ name: user.name, image: user.imageURL, token: token });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}