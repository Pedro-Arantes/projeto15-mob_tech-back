import { userSchema } from "../index.js";
import { usersCollection } from "../databases/db.js";
import bcrypt from "bcrypt";

export async function postSignup (req, res) {

    const user = req.body;
    
    
    const { error } = userSchema.validate(user, {abortEarly: false});
    if (error){
        const errors = error.details.map((details) => details.message);
        console.log(errors);
        res.status(400).send(errors)
    }

    const emailExistente = await usersCollection.findOne({email: user.email});
        if(emailExistente){
            res.status(500).send("Ja foi criada uma conta com esse email!");
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