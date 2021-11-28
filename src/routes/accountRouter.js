const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/' , accountController.account)
router.get('/register' , accountController.register)
router.get('/login' , accountController.login)
router.get('/edit' , accountController.accountEdit)


module.exports = router;