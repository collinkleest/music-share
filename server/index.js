const express = require("express");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
require('dotenv').config();
const { apiRouter } = require('./routes/api/index.js');

/*
* express configuration
* cors and front end config
*/
app.use(cors());
app.use(express.json());
app.use(express.static('../client/dist'));

/*
* mongodb configuration for persistant db store
* uses env vars defined in .env file
*/
const mongoUri = "mongodb+srv://" + process.env.MONGO_USR + ":" + process.env.MONGO_PASS + "@" + process.env.MONGO_URL + "/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
const APP_PORT = process.env.PORT || 5000;
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true}
);

app.use('/api', apiRouter);

app.listen(APP_PORT, () => {console.log(`Music-Share Backend is Running on: ${APP_PORT}`)});