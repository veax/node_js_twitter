const User = require('../database/models/user.model')

exports.createUser = async (user) => {
    try {
        console.log('hash password, user:', user)
        const hashedPassword = await User.hashPassword(user.password)
        console.log('password hashed')
        const newUser = new User({
            userName : user.username,
            local : {
                email : user.email,
                password : hashedPassword
            }
        })
        console.log('user created in users.queries, newUser:', newUser)
        return newUser.save()
    } catch(err) {
        throw(err)
    }
}

exports.findUserPerMail = (email) => {
    return User.findOne({'local.email': email}).exec()
}

exports.findUserPerId = (id) => {
    return User.findById(id).exec()
}

exports.getUserByUsername = (userName) => {
    return User.findOne({userName}).exec();
}

exports.searchUsersPerUsername = (search) => {
    const regExp = '^' +  search;
    const reg = new RegExp(regExp)

    return User.find({userName: {$regex: reg}}).exec()
}

exports.addUserIdToCurUserFollowing = (curUser, userId) => {
    curUser.following = [...curUser.following, userId]
    // save return promise direct without exec()
    return curUser.save() 
}

exports.removeUserIdToCurUserFollowing = (curUser, userId) => {
    curUser.following = curUser.following.filter(objId => objId.toString() !== userId);
    return curUser.save() 
}
