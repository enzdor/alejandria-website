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
        console.log('Not here bitch');
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
    productUpdate: (req, res) => {
        const id = req.params.id
		
		const index = products.findIndex((prod)=>{
			return prod.id == id;
		})

		const updatedProduct = {
			id: products[index].id,
			...req.body
		};

        products[index] = updatedProduct;
        productsService.saveProducts();

        res.redirect('/products')
    },
    productAdd: (req, res) => {
        console.log('Hello there');
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
    productDelete: (req, res) => {
        const id = req.params.id
        const product = productsService.findOne(id);
        res.render('productDelete',
        {product})
    },
    productDestroy: (req, res) => {
        const id = req.params.id;

        const index = products.findIndex((prod)=>{
			return prod.id == id;
		})
        
        products.splice(index, 1);

        productsService.saveProducts()

        res.redirect('/products')
    },
    
};

module.exports = productsController;