productsService = require('../services/productsServices.js')

const products = productsService.getAll();
const productsPopular = productsService.getPopular();


const mainController = {
    index: (req, res) => {
        res.render('index',
        {productsPopular, products})
    },
    basket: (req, res) =>{
        res.render('basket',
        {productsPopular})
    },
    about: (req, res) =>{
        res.render('about')
    },
};

module.exports = mainController;