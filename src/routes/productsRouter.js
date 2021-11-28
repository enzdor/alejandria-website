const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/' , productsController.products)
router.get('/categories' , productsController.categories)
router.get('/detail' , productsController.productDetail)
router.get('/edit' , productsController.productEdit)
router.get('/add' , productsController.productAdd)


module.exports = router;