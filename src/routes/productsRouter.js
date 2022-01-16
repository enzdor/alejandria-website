const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require("multer");
const path = require('path');

/* MULTER */


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/img-products"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_img_' + path.extname(file.originalname));
  },
});

const uploadFile = multer({ storage });


/* EXPRESS VALIDATOR*/

const {check} = require('express-validator')
let validateProduct = [
    check('name').notEmpty().withMessage('Debes completar el nombre'),
    check('author').notEmpty().withMessage('Debes completar el nombre del autor'),
    check('description').notEmpty().withMessage('Debes completar la descripcion'),
    check('price').notEmpty().withMessage('Debes completar el precio'),
    check('genre').notEmpty().withMessage('Debes elegir un genero'),
]

/* SHOW ALL PRODUCTS */

router.get('/' , productsController.products)


/* SHOW ALL CATEGORIES */

router.get('/categories' , productsController.categories)



/* SHOW PRODUCT DETAIL */

router.get('/:id/' , productsController.productDetail)



/* EDIT ONE PRODUCT */

router.get('/:id/edit' , productsController.productEdit)
router.put('/:id' , validateProduct ,productsController.productUpdate)



/* CREATE ONE PRODUCT */

router.get('/add/product' , productsController.productAdd)
router.post('/', uploadFile.single('image'), validateProduct ,productsController.productStore)


// DELETE ONE PRODUCT

router.get('/:id/delete' ,productsController.productDelete)
router.delete('/:id' , productsController.productDestroy)


module.exports = router;