const express = require('express');
const cors = require('cors');
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const id = new ObjectId();

const app = express();

// middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.afkplob.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const addStudentCollection = client.db('allStudent').collection('students')

        app.post('/students', async (req, res) => {
            const student = req.body;
            console.log(student)
            const result = await addStudentCollection.insertOne(student);
            res.send(result)
        })

        app.get('/allStudents', async (req, res) => {
            const query = {};
            const allStudent = await addStudentCollection.find(query).toArray();
            res.send(allStudent)
        })

        app.get('/allStudents/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await addStudentCollection.findOne(filter);
            res.send(result)

        })


        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const filter = { _id: new ObjectId(id) }
            const result = await addStudentCollection.deleteOne(filter);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


app.get('/', async (req, res) => {
    res.send('student server is running')
})

app.listen(port, () => {
    console.log(`Student server running on ${port}`)
})

// allStudent
// students