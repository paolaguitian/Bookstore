import express from 'express';
//import db from '../sequelize';
//import books from '../models/books';

const router = express.Router();

router.get('/', (req, res) => {
    Book.findAll()
        .then(books => {
            console.log(gigs);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
});

module.exports = router;