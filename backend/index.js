const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')

require("dotenv").config();

const port = 9000 ;

// Connection a la base de donnees mongodb

app.use(cors()); 

mongoose.connect('mongodb://localhost:27017/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion a MongoDB reussie !'))
  .catch(() => console.log('Connexion a MongoDB echouee !'));


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(session({secret: 'iygbvikbad654ad',saveUninitialized: true,resave: true}));


app.use.bind(bodyParser.json());
app.use(express.json());

const usersRouter = require('./routes/users.route');

//app.use('/Items', usersRouter);
app.use('/user', usersRouter);

app.listen(port, () => {
  console.log('Express server is running on localhost:' + port);
});


