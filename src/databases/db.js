import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import bcrypt from 'bcrypt';

dotenv.config();

const DATABASE_NAME = 'MobTech';

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log('Connection to data server established!');
} catch (err) {
  console.log('Failed to connect to database:', err);
}

//Data base e collections
const db = mongoClient.db(DATABASE_NAME);
export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const cartsCollection = db.collection("carts");
export const favoritesCollection = db.collection("favorites");
export const purchasesCollection = db.collection("purchases");
export const productsCollection = db.collection("products");
export const adminsCollection = db.collection("admins");
//