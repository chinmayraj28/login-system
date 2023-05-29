// Requirements
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000

//Mongoose
const mongoose = require('mongoose')
mongoose.connect('yourmongourl');
const db = require('./models/accounts.js')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Login System By Chinmay Raj")
})

app.get('/api/accounts/:authkey', async (req, res) => {
  let key = req.params.authkey
  if (!key) {
    res.sendStatus(203)
    return;
  }
  if (!key === "keyop") {
    res.sendStatus(203)
    return;
  }

  let accounts = []
  await db.find({})
    .then((docs) => {
      docs.forEach(async (doc) => {
        let account = {
          Username: doc.username,
          Email: doc.email,
          Password: doc.password
        }
        accounts.push(account)
      })
      res.send(accounts)
    })
    .catch((err) => {
      console.log(err)
      return;
    });
});

app.get('/api/createaccount/:email/:username/:password', async (req, res) => {
  let email = req.params.email
  let username = req.params.username
  let password = req.params.password

  let emailCheck = await db.findOne({ email: email })
  if (emailCheck) {
    // res.send("❌ This Email Already Exists!")
    res.sendStatus(404)
    return;
  }

  let userCheck = await db.findOne({ username: username })
  if (userCheck) {
    // res.send('❌ This Username Already Exists, Try Another Username!')
    res.sendStatus(401)
    return;
  }

  let newdata = new db({
    username: username,
    email: email,
    password: password
  })
  newdata.save().catch(() => { });
  res.sendStatus(200)

});

app.get('/api/login/:email/:pass', async (req, res) => {
  let email = req.params.email 
  let pass = req.params.pass

  let check1 = await db.findOne({ email: email })
  if(!check1){
    res.sendStatus(404)
    return;
  }else{
    if(check1.password === pass){
      res.json({ username: check1.username, email: check1.email })
    }else{
      res.sendStatus(401)
    }
  }
  
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}\nURL: http://localhost:${port}`);
});