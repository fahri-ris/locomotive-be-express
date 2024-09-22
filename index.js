import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import KafkaConfig from "./kafkaConfig.js";
import controllers from "./locomotiveController.js";

const app = express();
const jsonParser = bodyParser.json();
const PORT = process.env.PORT || 8081;

// mongodb connection
mongoose.connect('mongodb://localhost:27017/locomotive');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// kafka
const kafkaConfig = new KafkaConfig()
kafkaConfig.consume('locomotive-info', (value) =>{
    console.log(value);
})

// api
app.post("/api/locomotive/send", jsonParser, controllers.sendMessageToKafka);

// running port
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})