const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const User = require('./models/User.js');
require('dotenv').config();

app.use(cors());

const mongoUri = "mongodb+srv://" + process.env.MONGO_USR + ":" + process.env.MONGO_PASS + "@" + process.env.MONGO_URL + "/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
const APP_PORT = process.env.PORT || 5000;

mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true}
);

app.use(express.json());
app.use(express.static('../client/dist'));


app.post("/users", async (req, res) => {
    
    await User.create({email: "testemail@cs.com",
    password: "bily",
    username: "joesmo123",
    firstname: "collin",
    lastname: "kleest"});
    res.send(JSON.stringify({
        wasSuccess: "YES",
    }))
}); 

app.listen(APP_PORT, () => {console.log(`Music-Share Backend is Running on: ${APP_PORT}`)});