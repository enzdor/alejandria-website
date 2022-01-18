const db = require('../database/models/index.js');
const { Op } = require('sequelize')

productsService = require('../services/productsServices.js')

const products = productsService.getAll();
const productsPopular = productsService.getPopular();


const mainController = {
    index: (req, res) => {

        db.Book.findAll(
            { limit: 4 }
        )
        .then((products) => {
            res.render('index', {products})
        })
    },
    about: (req, res) =>{
        res.render('about',
        {user: req.session.userLogged,})
    },
};

module.exports = mainController;