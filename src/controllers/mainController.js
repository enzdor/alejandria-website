const mainController = {
    index: (req, res) => {
        res.render('index')
    },
    account: (req ,res) =>{
        res.render('account')
    },
    basket: (req, res) =>{
        res.render('basket')
    },
    about: (req, res) =>{
        res.render('about')
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

module.exports = mainController;