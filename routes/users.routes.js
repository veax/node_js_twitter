const router = require('express').Router();
const {ensureAuthenticated} = require('../config/guards.config')
const {
    userProfile,
    signUpForm,
    signUp,
    uploadImage,
    userList,
    followUser,
    unfollowUser
  } = require('../controllers/users.controller');

router.get('/', userList);
// important à mettre /follow/:userId avant  '/:username' sinon follow considèré comme :username
router.get('/follow/:userId', followUser);
router.get('/unfollow/:userId', unfollowUser);
router.get('/:username', userProfile)  
router.get('/signup/form', signUpForm);
router.post('/signup', signUp);
router.post('/update/image', ensureAuthenticated, uploadImage);

module.exports = router;