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
    productStore: (req, res) => {
		let product = {
			id: Date.now(),
			...req.body
		};

		products.push(product);
		productsService.saveProducts();

		res.redirect('/account')
	},
};

module.exports = productsController;