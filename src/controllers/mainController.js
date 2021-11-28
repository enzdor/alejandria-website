const mainController = {
    index: (req, res) => {
        res.render('index')
    },
    basket: (req, res) =>{
        res.render('basket')
    },
    about: (req, res) =>{
        res.render('about')
    },
};

module.exports = mainController;