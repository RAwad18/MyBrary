// FILE NAMES ARE USUALLY IN THE SINGULAR FORM OF THEIR CORRESPONDING ROUTE FILE
// routes/authors.js -----> models/author.js
const mongoose = require('mongoose');

/* A Schema in NoSQL is essentially the same thing as a TABLE in a SQL DB */


//Creating a Schema - 
const authorSchema = new mongoose.Schema({
    // this can be thought of as defining the columns of our schema
    name: {
        type: String,
        required: true
    }
});

// 'Author' is the 'name of our table' --- authorSchema defines our 'table'
module.exports = mongoose.model('Author', authorSchema);

// Now we can import this model and use it to create new authors in our application