const {createUser, getUserByUsername, searchUsersPerUsername, addUserIdToCurUserFollowing, removeUserIdToCurUserFollowing, findUserPerId} = require('../queries/users.queries')
const {getUserTweetsFromAuthorId} = require('../queries/tweets.queries')
const path = require('path')
const multer = require('multer')
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/avatars'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})})

exports.userProfile = async (req, res, next) => {
    try {
        const userName = req.params.username;
        const user = await getUserByUsername(userName);
        const tweets = await getUserTweetsFromAuthorId(user._id);
        res.render('tweets/tweet.pug', { tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user, editable: false });
    } catch(err) {
        next(err)
    }
}

exports.signUpForm = (req, res, next) => {
    res.render('users/user-form', {errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
}

exports.signUp = async (req, res, next) => {
    const body = req.body;
    try {
        console.log('test create user : ', body)
        const user = await createUser(body);
        console.log('user created in users.controller');
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.render('users/user-form', {errors : [err.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user})
    }   
}

exports.uploadImage = [ 
    upload.single('avatar'),
    async (req, res, next) => {
        try{
            const user = req.user;
            user.avatar = `/images/avatars/${req.file.filename}`;
            await user.save()
            res.redirect('/')
        } catch(err) {
            next(err)
        }
    }
]

exports.userList = async (req, res, next) => {
    try{
        const search = req.query.search;
        const users = await searchUsersPerUsername(search)
        res.render('includes/search-menu', {users})
    }catch(e) {
        next(e)
    }
}

exports.followUser = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        // executer en parallèle 2 queries:
        const [,user] = await Promise.all([addUserIdToCurUserFollowing(req.user, userId), findUserPerId(userId)])
        res.redirect('/users/' + user.userName)
    }catch(e) {
        next(e)
    }
}

exports.unfollowUser = async (req, res, next) => {
    try{
        const userId = req.params.userId
        const [,user] = await Promise.all([removeUserIdToCurUserFollowing(req.user, userId), findUserPerId(userId)])
        res.redirect('/users/' + user.userName)
    }catch(e) {
        next(e)
    }
}