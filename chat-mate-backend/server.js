// importing 
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'
import Messages from './dbMessages.js'

// app config
const app = express()
const port = process.env.PORT || 9000

//const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1213922",
  key: "1b8c9d878edc557d4975",
  secret: "d845ddff19c0ad2419ec",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

// middlewares 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())//setting headers 
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin","*")
//     res.setHeader("Access-Control-Allow-Headers","*")
// })

// DB config
const connection_url = 'mongodb+srv://abhi2k:ePyYGrKxYC3oKL54@cluster0.shlnz.mongodb.net/chat-mate-db?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.once("open", () => {
    console.log("DB connected")
    const msgCollection = db.collection("messagecontents")//messagecontent comes from schema export
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        }else{
            console.log("error triggering pusher")
        }
    })
})
// ????

//api routess 
app.get('/',(req,res) => res.status(200).send("hello world"))

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    })
})

app.get("/messages/sync", (req, res) =>{
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data)
        }
    })
})
// listen
app.listen(port,()=> console.log(`Listening on localhost: ${port}`));

//ePyYGrKxYC3oKL54