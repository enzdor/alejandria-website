const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.get('/books', booksController.list)
router.get('/books/:id', booksController.detail)
router.get('/books/logged/:user_sub', booksController.listUserSub)
router.get('/books/created/:user_sub', booksController.listCreatedSub)
router.get('/books/favourite/:user_sub', booksController.listFavouriteSub)
router.post('/books', booksController.create)

module.exports = router