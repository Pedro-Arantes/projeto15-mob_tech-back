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

//
app.get('/', (req, res) => {
    res.sendStatus(200)
  })
  
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));