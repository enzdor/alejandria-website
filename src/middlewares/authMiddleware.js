function authMiddleware(req, res, next){
    if(req.session.userLogged === undefined){
        res.render('register')
    } else {
        next()
    }
}

module.exports = authMiddleware;