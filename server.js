// We DONT want to load in our environment variables UNLESS we are in a 'development enviroment'
if (process.env.NODE_ENV !== 'production') {
    //loads the dotenv dependency and 'parses' all the variables from the .env file
    //this way, they can be used with process.env
    require('dotenv').config();
}

/* REQUIRED LIBRARIES */
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');   //integrating with MongoDB
const bodyParser = require('body-parser')   // allows us to access input elements from our server

/* ROUTES */
//References to Routes - './' means relative to where server.js is located
const indexRouter = require('./routes/index.js')
const authorRouter = require('./routes/authors.js')

/* APP SETTINGS */
//app.set() assigns a 'setting name' to a 'value'
//we can store any value we want BUT...
//certain 'names' can be used to configure how the server behaves
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

/* EXPRESS MIDDLEWARE */
//app.use() mounts middleware either at the root path or a specified path
//if a path isn't specified, it's applied to all requests to all paths 
app.use(expressLayouts);    //expressLayouts makes it so we type boilerplate HTML only once
app.use(express.static('public'));    //serves all our 'static' files, located in the folder 'public'
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

/* MONGOOSE */
mongoose.set('strictQuery', false); //to remove a warning
//connecting our application with our database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) //DATABASE_URL is the url to our DB - {useNewUrlParser : true} the new URL parser drops support for the old style urls
const db = mongoose.connection;     //this variable stores the state of our connection
db.on('error', err => console.error(err));  //on 'error', log that error to the console
db.once('open', () => console.log("Connected to Mongoose...")); //upon connection for the 1st time, log to the console...

/* USE ROUTES */
//actually uses the indexRouter to handle all requests to the root path
//from here, specific requests (get, post, etc.) are handled according to what's inside './routes/index.js'
app.use('/', indexRouter);
app.use('/authors', authorRouter);

/* YOU KNOW WHAT THIS IS */
//our app/server is listening to a port
app.listen((process.env.PORT || 3000), err => {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${(process.env.PORT || 3000)}`);
});