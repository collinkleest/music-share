const { Router } = require('express');
const nodemailer = require("nodemailer");
const usersRouter = Router();
const User = require('../../../../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/status', async (req, res) => {
    res.send('USERS ROUTER IS ACTIVE');
})

/*
*   api route at '/api/v1/users'
*   checks if user can login
*   checks if a user is present in db
*   if passwords hashs match and checks for email verification
*/
usersRouter.get("/", async (req, res) => {
    let passWord = req.query.passWord;
    let userName = req.query.userName;
    await User.findOne({userName: userName}, async (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            const match = await bcrypt.compare(passWord, doc.passWord);
            if (match) {
                res.send(JSON.stringify({
                  status: "SUCCESS",
                  user: {
                      firstName: doc.firstName,
                      lastName: doc.lastName,
                      userName: doc.userName,
                      emailAddress: doc.emailAddress,
                      isVerified: doc.isVerified
                  }
                }));
            } else {
                res.send(JSON.stringify({
                  status: "FAILURE",
                  reason: "passwords don't match",
                  user: {
                      userName: doc.userName,
                      emailAddress: doc.isVerified
                  }
                }))
            }
        }
    });
});


/*
*   api route to create a user
*   this should trigger the process for email verification
*   TODO: ADD CHECKING FOR CURRENT USERNAME / EMAIL PRESENT IN DB
*   TODO: EMAIL VERIFICATION
*/
usersRouter.post("/", async (req, res) => {
    const password = req.body.passWord;
    const saltRounds = 10;
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


/*
*   checks for valid user name and email
*/
usersRouter.get("/usercheck", async (req, res) => {
  let userName = req.query.userName;
  let foundUserName = await User.exists({userName: userName});
  let emailAddress = req.query.emailAddress;
  let foundEmail = await User.exists({emailAddress: emailAddress});
  res.send(JSON.stringify({
      foundUserName: foundUserName,
      foundEmail: foundEmail
  }));
})

/*
*   sends email from backend for verification
*   method needs refinign.
*/
usersRouter.get("/email", async (req, res) => {
    
    /*
    *   create a transporter with credentials from env vars
    */
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_SERVER_URI,
        port: process.env.SMTP_SERVER_PORT,
        auth: {
        user: process.env.SMTP_SERVER_USER,
        pass: process.env.SMTP_SERVER_PASS 
        }
    });

    /*
    *   verify if the transporter is active
    */
    transport.verify(function(error, success) {
        if (error) {
                console.error(error);
        } else {
                console.info('Server is ready to take our messages');
        }
    });
  
    /*
    *   format of the actual email being sent
    *   TODO: refine format, add params db stuff for tokens etc...
    *   TODO: add logo to format
    */
    const mailOptions = {
        from: '"Example Team" <from@example.com>',
        to: 'user1@example.com, user2@example.com',
        subject: 'Nice Nodemailer test',
        text: 'Hey there, it’s our first message sent with Nodemailer ;) ', 
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
        attachments: [
        {
            filename: 'mailtrap.jpg',
            path: __dirname + '/mailtrap.jpg',
            cid: 'uniq-mailtrap.png' 
        }
        ]
    };

    /*
    *   sends the email to the recipient
    */
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    }); 
})

module.exports = { usersRouter };