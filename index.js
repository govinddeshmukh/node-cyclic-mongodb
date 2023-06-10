require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/Books')


const app = express()
const PORT = process.env.PORT || 3000


mongoose.set('strictQuery',false)
const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
} 
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
    })
})




app.get('/',(req,res)=>{
    res.send({title:'books'})
})
app.get('/add-note',async(req,res)=>{
    try {
        await Book.insertMany([
            {
                title:"This is First tittle",
                body:"Body1",
            },
            {
                title:"This is Second tittle",
                body:"Body2",
            }
        ])
    } catch (error) {
        console.log(error);
    }
})

app.get('books', async (req,res)=>{
    const book = await Book.find()
    if(book){
        res.json(book)
    }
    else{
        res.send("some went wrong")
    }
})

