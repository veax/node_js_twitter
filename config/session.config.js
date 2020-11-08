const { app } = require('../app')

const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

// secret est utilisé par express-session pour signer le cookie contenant l'id de la session. 
// Le serveur est ainsi le seul capable de savoir si le contenu du cookie a été modifié car il est le seul à connaître ce secret.
// resave permet de forcer la sauvegarde de la session à chaque requête même si elle n'est pas modifiée.
// saveUninitialized permet de sauvegarder une session, même si elle ne contient aucune information. 
//Ici, nous ne voulons sauvegarder que les sessions des utilisateurs authentifiés. 
//Si le nous le passions à true des sessions vides pour les requêtes non authentifiées seraient sauvegardées dans la base de données sans id d'utilisateur.
// Pour le cookie nous voulons y accéder uniquement côté serveur (httpOnly) 
// maxAge : durée de vie de cookie
// ttl : durée de vie de session
app.use(session({
  secret: 'je suis un secret key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 14 
  },
   store: new mongoStore({
     mongooseConnection: mongoose.connection,
     ttl: 60*60*24*14
   })
}))