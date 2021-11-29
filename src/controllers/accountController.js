productsService = require('../services/productsServices.js');

const products = productsService.getAll();
productsPopular = productsService.getPopular();


const accountController = {
    account: (req ,res) =>{
        res.render('account',
        {products, productsPopular})
    },
    register: (req, res) =>{
        res.render('register')
    },
    login: (req, res) => {
        res.render('login')
    },
    accountEdit: (req, res) => {
        res.render('accountEdit')
    }
};

module.exports = accountController;