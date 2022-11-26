import { cartsCollection,sessionsCollection  } from "../databases/db.js"
import { ObjectId } from "mongodb";

export async function  postCart(req,res){
    const { model, price, img,amount } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);
    try {
        const session = await sessionsCollection.findOne({ token });
        
        if (!session) {
            console.log("aqui")
            return res.sendStatus(401);
        }
        const userId = session.userId

        const obj = {
            userId,
            model,
            price,
            img,
            amount
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
    const { authorization,id } = req.headers
    
    const token = authorization?.replace('Bearer ', '');
    

    if (!token) return res.sendStatus(401);

    try {
        const session = await sessionsCollection.findOne({ token });

        if (!session) return res.sendStatus(401);

        

        await cartsCollection.deleteOne({ _id: ObjectId(id) })
        
        res.sendStatus(200)
        return
    }catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export async function deleteCart (req,res){

}

export async function updateAmount(req,res){
    const { amount,id } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if (!token) return res.sendStatus(401);

    try {
        const session = await sessionsCollection.findOne({ token });
        
        if (!session) {
            console.log("aqui")
            return res.sendStatus(401);
        }
        
        await cartsCollection.updateOne({ 
			_id: ObjectId(id)
		}, { $set: {amount} })

        res.sendStatus(200)

    } catch (error) {
        console.log(error)
    }
}

