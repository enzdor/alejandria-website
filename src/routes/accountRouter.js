const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

/* MIDDLEWARES*/

const authMiddleware = require('../middlewares/authMiddleware');

/* EXPRESS VALIDATOR*/

const {check} = require('express-validator')
let validateAccountCreate = [
    check('userName').notEmpty().withMessage('Debes completar el nombre'),
    check('email').notEmpty().withMessage('Debes completar el email').isEmail().withMessage('Tiene que ser un mail valido'),
    check('password').notEmpty().withMessage('Debes completar la contrasena'),
]
let validateAccountUpdate = [
    check('firstName').notEmpty().withMessage('Debes completar el nombre'),
    check('lastName').notEmpty().withMessage('Debes completar el nombre'),
    check('password').notEmpty().withMessage('Debes completar la contrasena')
]
let validateAccountLogin = [
    check('email').notEmpty().withMessage('Debes completar el mail'),
    check('password').notEmpty().withMessage('Debes completar la contrasena')
]

/* ACCOUNT INFO*/
router.get('/', authMiddleware , accountController.account)


/*ACCOUNT REGISTER*/
router.get('/register' , accountController.register)
router.post('/register' , validateAccountCreate , accountController.accountStore)


/*ACCOUNT LOGIN*/
router.get('/login' , accountController.login)
router.post('/login', validateAccountLogin ,accountController.loginProcess)


/*EDIT ACCOUNT*/
router.get('/edit' , authMiddleware ,accountController.edit)
router.put('/edit' , validateAccountUpdate ,accountController.accountUpdate)


module.exports = router;