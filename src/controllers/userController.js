
import { usersCollection } from "../databases/db.js";
import bcrypt from "bcrypt";

export async function postSignup (req, res) {

    const user = req.body;

    const emailExistente = await usersCollection.findOne({email: user.email});
        if(emailExistente){
            res.sendStatus(500);
            return;
        }

    const hashPassword = bcrypt.hashSync(user.password, 10);

    const bodyCadastro = {
        name: user.name,
        email: user.email,
        password: hashPassword
    }

    try {
        await usersCollection.insertOne(bodyCadastro);
        res.sendStatus(200);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
        return;
    }



}