const {app} = require('../app')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {findUserPerMail, findUserPerId} = require('../queries/users.queries')

app.use(passport.initialize());
app.use(passport.session());

// stocker dans session à partir de login de user
// appeller au moment de la connexion d'expliquer à passport ce qu'il doit stocker dans un objet "session"
// serialize : transform JS Obj -> String
passport.serializeUser((user, done) => {
    done(null, user._id);
})

// recuperer user depuis bdd avec id user stocké dans session  
// permet d'accèder à utilisateur connecté par req.user plus tard  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserPerId(id);
        done(null, user)
    } catch (err) {
        done(err)
    }
})

// Dans la stratégie "local" de Passport, l'option usernameField 
// correspond au paramètre que nous utilisons pour passer l'identifiant 
// dans la requête d'envoi des identifiants
// Il est nécessaire d'installer pacage passport-local pour pouvoir utiliser strategie locale
// usernameField: 'email' établit que identification de user est fait à partir de req.email
passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await findUserPerMail(email)
        if (!user) {
            done(null, false, {message : 'User not found'})
        } else {
            const match = await user.comparePassword(password);
            if (match) {
                done(null, user)
            } else {
                done(null, false, {message : 'Wrong password'})
            }
        }
    } catch (err) {
        done(err)
    }
}))