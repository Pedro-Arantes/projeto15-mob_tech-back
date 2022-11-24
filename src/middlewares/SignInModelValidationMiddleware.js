import { signInModel } from "../models/signInModel.js";


export function validateSignInModel(req, res, next) {
    const signIn = req.body;
    const { error } = signInModel.validate(signIn, { abortEarly: false });
    if (error) {
        const errors = error.details.map((details) => details.message);
        console.log(errors);
        res.status(400).send(errors)
    }

    next();
}