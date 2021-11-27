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
    }
};

module.exports = mainController;