const express = require("express");
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User.js');
const { readdirSync } = require("fs");
require('dotenv').config();


// configuration
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

var client_id = '2882143527a54613837f2945a468613d'; 
var client_secret = '5077792527b94777b61f3d3485799b76';
var redirect_uri = 'http://localhost:5000/callback';


// Start of AUTH
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          res.redirect('/#/home?token='+access_token);
          // var options = {
          //   url: 'https://api.spotify.com/v1/me',
          //   headers: { 'Authorization': 'Bearer ' + access_token },
          //   json: true
          // };
  
          // // use the access token to access the Spotify Web API
          // request.get(options, function(error, response, body) {
          //   console.log(body);
          // });
  
          // we can also pass the token to the browser to make requests from there
        //   res.redirect('/#' +
        //     querystring.stringify({
        //       access_token: access_token,
        //       refresh_token: refresh_token
        //     }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
// end of Auth


const mongoUri = "mongodb+srv://" + process.env.MONGO_USR + ":" + process.env.MONGO_PASS + "@" + process.env.MONGO_URL + "/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
const APP_PORT = process.env.PORT || 5000;

mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true}
);

app.use(express.json());
app.use(express.static('../client/dist'));

const saltRounds = 10;

// verify username and password
app.get("/api/users", async (req, res) => {
    let passWord = req.query.passWord;
    let userName = req.query.userName;
    await User.findOne({userName: userName}, async (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            const match = await bcrypt.compare(passWord, doc.passWord);
            if (match) {
                res.send(JSON.stringify({
                  status: "SUCCESS"
                }));
            } else {
                res.send(JSON.stringify({
                  status: "FAILURE"
                }))
            }
        }
    });
});

// create user and hash password in DB
app.post("/api/users", async (req, res) => {
    var password = req.body.passWord;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        await User.create({
        passWord: hash,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress, 
        isVerified: false
      });
    });

    res.send(JSON.stringify({
        wasSuccess: "YES",
    }))
}); 

app.get("/api/users/:userName", async (req, res) => {
  let userName = req.params.userName;
  let foundUser = await User.exists({userName: userName});
  res.send(foundUser);
})

app.listen(APP_PORT, () => {console.log(`Music-Share Backend is Running on: ${APP_PORT}`)});