const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  local: {
    email: {type: String, required: true, unique: true},
    password : {type: String, required: true}
  },
  avatar: {
    type: String, default: '/images/default_profile.png', 
  },
  following : {type: [schema.Types.ObjectId], ref: 'user'}
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
}

// ne pas utiliser arrow function to correctly refer with this.local
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password)
}
const User = mongoose.model('user', userSchema);

module.exports = User;
