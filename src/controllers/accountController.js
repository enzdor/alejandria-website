const accountController = {
    account: (req ,res) =>{
        res.render('account')
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