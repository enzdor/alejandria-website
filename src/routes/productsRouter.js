const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/' , productsController.products)
router.get('/categories' , productsController.categories)


module.exports = router;