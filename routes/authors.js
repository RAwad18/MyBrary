const express = require('express');
const router = express.Router();
const Author = require('../models/author.js')

//EVERY ROUTE IS PREPENDED WITH /AUTHORS...SEE LINE 40 IN SERVER.JS

// Getting All Authors Route
router.get('/', (req, res) => {
    res.render('authors/index')     //renders the view in views/authors/index.ejs
})

// New Author Route - displays the form for adding a new author
router.get('/new', (req, res) => {

    // Passed in a variable (author, with a value of 'new Author()' )
    // doesn't save anything to the database, but does create an author which we can use to save, update, delete
    // also gives us an obj to use inside our .ejs file
    res.render('authors/new', { author: new Author() })       //renders the view in views/authors/new.ejs
})

// Create Author Route
router.post('/', (req, res) => {
    
    console.log(req.body);

    // create new author object using Author schema
    const createdAuthor = new Author({
        name: req.body.name
    })

    // save created author to the DB
    createdAuthor.save((err, newAuthor) => {
        if (err) {
            // redirect to author creation form page on error --- 
            res.render('authors/new', {
                author: createdAuthor,  // this makes it so author.name, on this redirect due to an error, would equal what the user had input
                errorMessage: 'Error creating author!'
            })
        } else{
            // res.redirect(`authors/${newAuthor.id}`)  --- commented out for now
            res.redirect('authors')
        }
    })
})

module.exports = router;    