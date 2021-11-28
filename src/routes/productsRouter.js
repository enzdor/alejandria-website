const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/' , productsController.products)
router.get('/categories' , productsController.categories)
router.get('/detail' , productsController.productDetail)


module.exports = router;