const express = require('express');
const app= express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oskupvl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const carCollection = client.db('carDatabase').collection('cars')

        app.get('/cars', async(req, res) =>{
            const query= {};
            const cursor= carCollection.find(query)
            const car= await cursor.toArray();
            res.send(car);
        })


        app.get('/car/:id', async(req,res) =>{
            id=req.params.id;
            const query ={_id: ObjectId(id)};
            const car= await carCollection.findOne(query);
            res.send(car)
        })
    }
    
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/',(req , res)=>{
    res.send("RentVroom server is running")
})

app.listen(port ,() =>{
    console.log(`Server running on ${port}`)
})