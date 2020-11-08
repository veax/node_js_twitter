const passport = require("passport")

exports.signInForm = (req, res, next) => {
    res.render('auth/auth-form', {errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
}

// passport.authenticate('local') invoke passport strategy passport.use('local'...

// *****************************
// Important!
// express-session tries to delay the redirect, 
// but some browsers don't wait for the whole response before directing. 
// So you need to manually save before redirecting:
// req.session.save(() => {
//    res.redirect('/tweets')
//})
// *****************************
exports.signIn = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // retour depuis callback done() de LocalStrategy
        if (err) {
            console.log(err)
            next(err);
        }
        else if (!user)  {
            res.render('auth/auth-form', {errors: [info.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user});
        }else {
            req.login(user, (err) => {
                if (err) next(err);
                else {
                    req.session.save(() => {
                        res.redirect('/tweets')
                    })
                }
            })
        }
    })(req, res, next)
}

exports.signOut = (req, res, next) => {
    // supprime value of key "passport" in bdd session obj
    req.logout();
    req.session.save(() => {
        res.redirect('/auth/signin/form')
    })
}