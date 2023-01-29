const express = require('express');
const router = express.Router();
const Author = require('../models/author.js')

//EVERY ROUTE IS PREPENDED WITH /AUTHORS...SEE LINE 40 IN SERVER.JS

// Getting All Authors Route
router.get('/', async (req, res) => {
    
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }

})

// New Author Route - displays the form for adding a new author
router.get('/new', (req, res) => {

    // Passed in a variable (author, with a value of 'new Author()' )
    // doesn't save anything to the database, but does create an author which we can use to save, update, delete
    // also gives us an obj to use inside our .ejs file
    res.render('authors/new', { author: new Author() })       //renders the view in views/authors/new.ejs
})

// Create Author Route
router.post('/', async (req, res) => {

    // create new author object using Author schema BEFORE the try-catch block
    const createdAuthor = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await createdAuthor.save();
        // res.redirect(`authors/${newAuthor.id}`)  --- commented out for now
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: createdAuthor,  // this makes it so author.name, on this redirect due to an error, would equal what the user had input
            errorMessage: 'Error creating author!'
        })
    }
})

module.exports = router;    