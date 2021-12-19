const bcryptjs = require('bcryptjs')
const productsService = require('../services/productsServices.js');
const products = productsService.getAll();
const productsPopular = productsService.getPopular();

const accountsService = require('../services/accountsServices.js');
const accounts = accountsService.getAll();

const {validationResult} = require('express-validator');

const accountController = {
    account: (req ,res) =>{
        res.render('account',
        {products,
        productsPopular,
        user: req.session.userLogged,
        })
    },
    register: (req, res) =>{
        res.render('register')
    },
    accountStore: (req, res) =>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let accountDb = accountsService.findByField('email', req.body.email)
            
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
            let account = {
                id: Date.now(),
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10)
            };
    
            accounts.push(account);
            accountsService.saveAccounts();
            
            let userLogin = accountsService.findByField('email', req.body.email);
            req.session.userLogged = userLogin;
            res.redirect('/account');


        } else {
            res.render('register',
            {errors: errors.errors, old: req.body})
        }
    },
    login: (req, res) => {
        res.render('login')
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req);

        let userLogin = accountsService.findByField('email', req.body.email);
        
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
                res.render('login', {
                    errors: errors.errors
                })
                return
            }
        }

        errors.errors.push({
            value: req.body.email,
            msg: 'No hay una cuenta que use este mail',
            param: 'email',
            location: 'body'
        })
        res.render('login', {
            errors: errors.errors
        })
        return

    },
    edit: (req, res) => {
        let errors = validationResult(req);

        res.render('accountEdit', 
        {user: req.session.userLogged,
        errors: errors.errors})
    },
    accountUpdate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            const index = accounts.findIndex((acc)=>{
                return req.session.userLogged.id == acc.id;
            })

            const updatedAccount = {
                id: req.session.userLogged.id,
                ...req.body,
                email: req.session.userLogged.email,
                type: req.session.userLogged.type,
                password: bcryptjs.hashSync(req.body.password, 10)
            }
            
            accounts[index] = updatedAccount;
            accountsService.saveAccounts();
            req.session.userLogged = updatedAccount;

            res.redirect('/account')
            return

        } else {
            let errors = validationResult(req);
            req.session.userLogged = updatedAccount;

            res.render('accountEdit', 
            {user: req.session.userLogged,
            errors: errors.errors})
            return
        }
        
    }
};

module.exports = accountController;