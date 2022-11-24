import { usersCollection, sessionsCollection } from "../databases/db.js";
import { v4 as uuidV4 } from 'uuid';
import bcrypt from "bcrypt";


export async function postLogin(req, res) {

    const { email, password } = req.body;
    const token = uuidV4();

    const userExistente = await usersCollection.findOne({ email: email });
    if (!userExistente) {
        console.log("Usuário não encontrado")
        res.sendStatus(404);
        return;
    }

    const logado = await sessionsCollection.findOne({ userId: userExistente._id });
    if (logado !== null) {
        res.sendStatus(401);
        return;
    }

    const passwordOk = bcrypt.compareSync(password, userExistente.password);
    if (!passwordOk) {
        res.sendStatus(401);
        return;
    }

    try {

        await sessionsCollection.insertOne({
            token,
            userId: userExistente._id,
        })

        res.send([{ token: token, name: userExistente.name, userId: userExistente._id }])
        return;

    } catch (err) {
        console.log(err, "erro no try/catch /login ")
        res.sendStatus(500);
        return;
    }
}