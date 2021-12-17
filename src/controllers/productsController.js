const productsService = require('../services/productsServices.js');
const products = productsService.getAll();

const {validationResult} = require('express-validator');


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
    productUpdate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
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
        } else {
            const id = req.params.id
            const product = productsService.findOne(id);
            res.render('productEdit',
            {product, errors: errors.errors, old: req.body})
        }
        
    },
    productAdd: (req, res) => {
        res.render('productAdd')
    },
    productStore: (req, res) => {
		let errors = validationResult(req);

        if (errors.isEmpty()) {
            let product = {
                id: Date.now(),
                ...req.body,
                user: req.session.userLogged.email
            };
    
            products.push(product);
            productsService.saveProducts();
    
            res.redirect('/account')
        } else {
            res.render('productAdd',
            {errors: errors.errors, old: req.body})
        }
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