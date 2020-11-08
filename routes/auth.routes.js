const router = require('express').Router()
const {signInForm, signIn, signOut} = require('../controllers/auth.controller')


router.get('/signin/form', signInForm)
router.post('/signin', signIn)
router.get('/signout', signOut)


module.exports = router