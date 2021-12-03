require("dotenv").config();

const express = require('express');
const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken')
const router = express.Router();
let User = require('../models/user.model') ;
const bodyParser = require("body-parser");
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser');

// must use cookieParser before expressSession
app.use(cookieParser());

app.use(express.json)
app.use.bind(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let refreshTokens = []
let con_users = []

app.use(session({secret: 'iygbvikbad654ad',saveUninitialized: true,resave: true}));

router.route('/token').post((req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newuser = new User({username : username})
    newuser.save()
    .then(() => console.log('user added !!'))
    .catch( err => res.status(400).json('Error' + err))
    console.log('Hi there server side!')
})
router.route('/').get((req, res) => {
    console.log('Hi there from server side!')

    console.log("\n==== Listing users ====\n")

    User.find(function (err, items){
      if(err){
        console.log(err);
      }
      else {
        res.json(items);
      }})
  });

  router.route('/botapi').post((req, res) => {
    console.log("authenticating user")
    const pwd = process.env.BOT_KEY

    const password = req.body.botkey
  
    console.log(req.body.password)
   

    if( password == pwd){
      res.json({
        username: con_users[0],
        password: pwd,
        message: "success"
      })
    }
    else{
      console.log("error")
      res.json({
        message: "error"
      })
    }
     
     
   } )


   router.route('/logout').post((req, res) => {
     
    console.log("logout")
   res.json({
     message: "response"
   })
  
     })
  
  router.route('/login').post((req, res) => { 
    // Authenticating User
  const username = req.body.username
  const password = req.body.password


  console.log(User.findOne( { username: username, password: password },function(err){  console.log(err)}).exec())

  if( username != "" && password != "" ){
  
  /*if( !User.findOne( { username: username, password: password },function(err){ 
    console.log("======"+err)
    
   })) { if(err){
    res.json({
      message: "error in logging in"
    })
  }}
   
  
   if( User.findOne( { username: username, password: password },function(err){  console.log(err)}).exec()) { 
  */
  User.findOne({ username: username, password: password }, function(err, user){
   

      if(user === null){
        return err
      }
     
      else {
        const sess = req.session
        if(con_users.length == 0) { sess.connected_users = [] } 
        
        if(con_users.find( check = (u)  => { return u == username }) == null){
        con_users.push(username)
        sess.connected_users = con_users
        }
        console.log(con_users)
    
        const USERNAME = user.username;
        const PASSWORD = user.password;
       
        const usr = {
          username: USERNAME,
          password: PASSWORD
        }
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({
          user,
          token
        });
        console.log("loggedin!!")
      
    }}) 
  
  }
})

    
  
  function generateAccessToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10s' })
  }
  


  
module.exports = router