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
        {products, productsPopular})
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
    
            res.redirect('/account')
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
                res.redirect('/account/');
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
        res.render('accountEdit')
    }
};

module.exports = accountController;