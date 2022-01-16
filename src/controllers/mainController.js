const db = require('../database/models/index.js');
const { Op } = require('sequelize')

productsService = require('../services/productsServices.js')

const products = productsService.getAll();
const productsPopular = productsService.getPopular();


const mainController = {
    index: (req, res) => {

        db.Book.findAll({
            where: { id: {[Op.lt] : 5}}
        })
        .then((products) => {
            res.render('index', {products})
        })
    },
    basket: (req, res) =>{
        res.render('basket',
        {productsPopular, products})
    },
    about: (req, res) =>{
        res.render('about',
        {user: req.session.userLogged,})
    },
};

module.exports = mainController;