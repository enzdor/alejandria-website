const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


/* MIDDLEWARES*/

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/' , mainController.index)
router.get('/basket', authMiddleware , mainController.basket)
router.get('/about' , mainController.about)


module.exports = router;