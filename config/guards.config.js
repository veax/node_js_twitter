// TODO : resoudre pb de isAuthenticated() == false même après bonne connexion
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('is authenticated: ', req.isAuthenticated())
        next()
    } else {
        console.log('is authenticated: ', req.isAuthenticated())    
        res.redirect('/auth/signin/form')
    }
}


