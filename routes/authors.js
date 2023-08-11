const express = require('express')
const Author = require('../models/author')
const router = express.Router()

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query 
        })
    }
    catch {
        res.redirect('/')
    }
    
})

// New author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// Create author route
router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    author.save().then((newAuthor) => {
        res.render('authors')
    }).
    catch((err) => {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author...'
        })
    })

})

module.exports = router