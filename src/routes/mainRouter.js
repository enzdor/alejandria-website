const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


/* MIDDLEWARES*/


router.get('/' , mainController.index)
router.get('/about' , mainController.about)


module.exports = router;