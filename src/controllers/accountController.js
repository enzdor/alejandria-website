const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const productsService = require('../services/productsServices.js');
const products = productsService.getAll();
const productsPopular = productsService.getPopular();

const {validationResult} = require('express-validator');

const accountController = {
    account: (req ,res) =>{

        db.Book.findAll({
            where: {
                user_id: req.session.userLogged.id
            }
        }).then((products) => {
            res.render('account', {products, user: req.session.userLogged})
        })

        /*

        res.render('account',
        {products,
        productsPopular,
        user: req.session.userLogged,
        })

        */
    },
    register: (req, res) =>{
        res.render('register')
    },
    accountStore: (req, res) =>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((user) => {
                let accountDb = user;

                if (accountDb){
                    errors.errors.push({
                        value: req.body.email,
                        msg: 'Este mail ya esta en uso',
                        param: 'email',
                        location: 'body'
                    })
                    res.render('register',{errors: errors.errors})
                    return
                }
    
    
                db.User.create({
                    user_name: req.body.userName,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    category_id: 1
                }).then(()=>{
                    
                    let userLogin = db.User.findOne({
                        where: {
                            email: req.body.email
                        }
                    }).then((user) => { return user } )
                    .catch((err) => {
                        console.log(err);
                    });
    
                    req.session.userLogged = userLogin;
                    
                    res.redirect('/account');
                })
                .catch((err) => {
                    console.log(err);
                });
    
            } );
        } else {
            res.render('register',
            {errors: errors.errors, old: req.body})
        }

        /*

        to do

        - check if there are any errors
            - if there are render errors

        - find if user exists with that email
            - if there is create and send error
        
        - create and store user in database


        */
    },
    login: (req, res) => {
        res.render('login')
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((user) => {
                let userLogin = user;

                if (userLogin) {

                    let passwordOk = bcryptjs.compareSync(req.body.password, userLogin.password);

                    if (passwordOk){

                        req.session.userLogged = userLogin;
                        res.redirect('/account');
                        return

                    } else {
                        errors.errors.push({
                            value: req.body.email,
                            msg: 'La contraseña es incorrecta',
                            param: 'password',
                            location: 'body'
                        })
                        res.render('login',{errors: errors.errors})
                        return
                    }

                } else {
                    errors.errors.push({
                        value: req.body.email,
                        msg: 'No hay cuenta que use este mail',
                        param: 'email',
                        location: 'body'
                    })
                    res.render('register',{errors: errors.errors})
                    return
                }
            })
        } else {
            res.render('login',
            {errors: errors.errors, old: req.body})
        }



        /*

        to do

        - check if there are errors
            - if there are, render errors

        - check if an account exists with the email in body
            - if there isnt one, create and render error

        - check if password is ok
            - if password is not ok render error

        - login

        */

    },
    edit: (req, res) => {
        let errors = validationResult(req);

        res.render('accountEdit', 
        {user: req.session.userLogged,
        errors: errors.errors})
    },
    accountUpdate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.update(
                {
                    user_name: req.body.userName,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    category_id: 1
                },
                {
                    where: {
                        id: req.session.userLogged.id
                    }
                }
            ).then(()=> {
                db.User.findByPk(req.session.userLogged.id)
                .then((user)=>{
                    req.session.userLogged = user;
                    res.redirect('/account')
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });

        } else {
            res.render('accountEdit', 
            {user: req.session.userLogged,
            errors: errors.errors, old: req.body})
        }

        /*


        to do

        - check if there are errors
            - if there are errors, render errors

        - update account

        - render account view


        */
    }
};

module.exports = accountController;