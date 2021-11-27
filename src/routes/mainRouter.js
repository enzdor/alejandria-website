const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/' , mainController.index)
router.get('/account' , mainController.account)
router.get('/basket' , mainController.basket)
router.get('/about' , mainController.about)


module.exports = router;