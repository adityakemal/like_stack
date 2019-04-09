const express = require('express')
const bodyParser = require('body-parser')
const models = require('./models')
const session = require('express-session')
const user = require('./routes/user')

var flash = require('express-flash');

var app = express()

app.use(flash());

// middware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//set engine
app.set('view engine', 'ejs');
//static public
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'iloveit',
  // resave: true,
  // saveUninitialized: true
  // cookie: {
  //   maxAge: 60000 * 60
  // } //10 detik
}));



// var user = models.User
app.use('/', user)







app.listen('3000', () => {
  console.log('running in port 3000');
})
