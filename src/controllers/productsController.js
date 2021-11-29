productsService = require('../services/productsServices.js')

const products = productsService.getAll();


const productsController = {
    products: (req, res) => {
        res.render('products',
        {products})
    },
    categories: (req, res) => {
        res.render('categories')
    },
    productDetail: (req, res) => {
        const id = req.params.id
        const product = productsService.findOne(id);
        res.render('productDetail',
        {product})
    },
    productEdit: (req, res) => {
        const id = req.params.id
        const product = productsService.findOne(id);
        res.render('productEdit',
        {product})
    },
    productAdd: (req, res) => {
        res.render('productAdd')
    },
    productStore: (req ,res) => {
        res.send(req.body + 'Hola')
    }
};

module.exports = productsController;