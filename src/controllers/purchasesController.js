import { purchasesCollection,cartsCollection ,usersCollection,sessionsCollection } from "../databases/db.js"


export async function  postPurchase (req,res){

    const { adress,tell,total } = req.body;
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
        console.log(userId)
        const cart = await cartsCollection.find({userId}).toArray();
        const user = await usersCollection.findOne(  {_id: userId} );
        const {email,name} = user
        const obj = {
            email,
            name,
            adress,
            tell,
            total,
            cart,
        }
        console.log(obj)
        await purchasesCollection.insertOne({obj});
        await cartsCollection.deleteMany({userId})
        res.sendStatus(201);
        return

    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }
}