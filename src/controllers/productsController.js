const productsService = require('../services/productsServices.js');
const products = productsService.getAll();

const db = require('../database/models');

const {validationResult} = require('express-validator');


const productsController = {
    products: (req, res) => {

        const userl = req.session.userLogged;

        if(userl == undefined){
            db.Book.findAll()
            .then((products) => {
                res.render('products' , {products})
            })
        } else {
            const findBooks = db.Book.findAll();
            const findFavourites = db.Favourite_book.findAll({
                where: {
                    user_id: userl.id
                }
            });
            const user = db.User.findByPk(userl.id);

            Promise.all([findBooks, findFavourites, user])
            .then((values) => {
                res.render('products', {products: values[0], favourites: values[1], user: values[2]})
            })
        }

    },
    categories: (req, res) => {
        res.render('categories')
    },
    productDetail: (req, res) => {
        const id = req.params.id;

        const user = req.session.userLogged;


        if (user == undefined){
            db.Book.findByPk(id)
            .then((product) => {
                res.render('productDetail' , {product})
            })
        } else {
            const findBook = db.Book.findByPk(id);
            const findFavourites = db.Favourite_book.findAll();
            const user = db.User.findByPk(req.session.userLogged.id);
    
            Promise.all([findBook, findFavourites, user])
    
            .then((values) => {
                res.render('productDetail', {product: values[0], favourites: values[1], user: values[2] })
            })
        }
        

        

        /*

        const product = productsService.findOne(id);
        res.render('productDetail',
        {product})

        */
    },
    productEdit: (req, res) => {
        const id = req.params.id;

        db.Book.findByPk(id)
        .then((product) => {
            res.render('productEdit', {product})
        })

        /*

        const product = productsService.findOne(id);
        res.render('productEdit',
        {product})

        */
    },
    productUpdate: (req, res) => {
        const id = req.params.id;
        let errors = validationResult(req);

        if (errors.isEmpty()){

            db.Book.update(
                {
                    name: req.body.name,
                    author: req.body.author,
                    description: req.body.description,
                    image: (req.file.path).split('images').pop(),
                    price: req.body.price,
                    genre_id: req.body.genre,
                    user_id: req.session.userLogged.id
                },
                {
                    where: { id: id }
                }
            ).then(()=> {
                res.redirect('/products/' + id);
            })

        } else {

            db.Book.findByPk(id)
            .then((product) => {
                res.render('productEdit', {product, errors: errors.errors})
            })

        }

        /*

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


        to do 

        - check if there are errors
            - if there are, render errors

        - findByPk product and update it

        - redirect to product/id


        */
        
    },
    productAdd: (req, res) => {
        res.render('productAdd')
    },
    productStore: (req, res) => {
		let errors = validationResult(req);

        if (errors.isEmpty()){


            db.Book.create({
                name: req.body.name,
                author: req.body.author,
                description: req.body.description,
                image: (req.file.path).split('images').pop(),
                price: req.body.price,
                genre_id: Number(req.body.genre),
                user_id: req.session.userLogged.id
            }).then(() => {
                res.redirect('/account')
            }).catch((err) => {
                console.log(err);
            });

            

        } else {
            res.render('productAdd' , {errors: errors.errors, old: req.body})
        }

        /*

        if (errors.isEmpty()) {
            let product = {
                id: Date.now(),
                ...req.body,
                image: (req.file.path).split('images').pop(),
            };
    
            products.push(product);
            productsService.saveProducts();
    
            res.redirect('/account')
        } else {
            res.render('productAdd',
            {errors: errors.errors, old: req.body})
        }

        to do

        - check if there are errors
            - if there are, render errors

        - create new product

        - redirect to account

        */
	},
    productDelete: (req, res) => {
        const id = req.params.id
        
        db.Book.findByPk(id)
        .then((product)=> {
            res.render('productDelete', {product})
        })

    },
    productDestroy: (req, res) => {
        const id = req.params.id;

        db.Book.destroy(
            { where : {id: id}, force: true}
        ).then(() => {
            res.redirect('/account')
        })
    }
};

module.exports = productsController;