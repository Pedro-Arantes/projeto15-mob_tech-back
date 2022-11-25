import express from "express";
import cors from "cors";
import joi from "joi";

//Routers
import userRouters from "./routes/usersRoutes.js"
import sessionRouters from './routes/sessionRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import purchaseRoutes from './routes/purchasesRoutes.js'
//

//Configs app
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouters);
app.use(sessionRouters)
app.use(cartRoutes)
app.use(productsRoutes)
app.use(purchaseRoutes)
//

//Schemas
export const userSchema = joi.object({
    name: joi.string().required().min(1),
    email: joi.string().required().min(1),
    password: joi.required()
});
//


const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));