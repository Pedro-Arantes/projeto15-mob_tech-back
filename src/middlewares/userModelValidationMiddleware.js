import { userModel } from "../models/userModel.js";


export function validateUserModel(req, res, next) {
    const user = req.body;
    const { error } = userModel.validate(user, { abortEarly: false });
    if (error) {
        const errors = error.details.map((details) => details.message);
        console.log(errors);
        res.status(400).send(errors)
    }

    next();
}
