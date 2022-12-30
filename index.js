const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntptfwh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
   const addingsTaskCollection=client.db('taskManager').collection('addedTask');

   app.get('/addings',async(req,res)=>{
    const email=req.query.email;
    const query={email:email};
    const addings=await addingsTaskCollection.find(query).toArray();
    res.send(addings)


   })

   app.post('/addings',async(req,res)=>{
    const adding=req.body;
    console.log(adding);
    const result= await addingsTaskCollection.insertOne(adding);
    res.send(result)
   })
    }
    finally{

    }

}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('task manager server running');
})

app.listen(port, () => console.log(`Task manager running on port ${port}`))