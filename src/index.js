import express from "express";
import cors from "cors";

//Routers
import userRouters from "./routes/usersRoutes.js"
import sessionRouters from './routes/sessionRoutes.js'
//

//Configs app
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouters);
app.use(sessionRouters)
//


const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));