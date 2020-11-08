const mongoose = require('mongoose');
const schema = mongoose.Schema;

// ref : 'user' correspond au nom du modèle mongoose.model('user', userSchema);
const tweetSchema = schema({
  content: {
    type: String,
    maxlength: [140, 'Tweet trop long'],
    minLength: [1, 'Tweet trop court'],
    required: [true, 'Champ requis'],
  },
  author: {type: schema.Types.ObjectId, ref: 'user', required: true}
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;
