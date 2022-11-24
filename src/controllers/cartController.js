import { cartsCollection,sessionsCollection  } from "../databases/db.js"

export async function  postCart(req,res){
    const { model, price, img } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);
    try {
        const session = await sessionsCollection.findOne({ token, });
        
        if (!session) {
            console.log("aqui")
            return res.sendStatus(401);
        }
        const userId = session.userId

        const obj = {
            userId,
            model,
            price,
            img
        }
        
        await cartsCollection.insertOne(obj);
        res.sendStatus(201);
        return

    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }

}

export async function getCart(req,res){

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);

    try {
        const session = await sessionsCollection.findOne({ token });

        if (!session) return res.sendStatus(401);

        const userId = session.userId

        const cart= await cartsCollection.find({ userId }).toArray()

        res.status(200).send({cart})

    } catch (error) {
        console.log(error)
    }
}

export async function deleteItem (req,res){

}

export async function deleteCart (req,res){

}

export async function updateAmount(req,res){

}

