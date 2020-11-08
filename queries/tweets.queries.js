const Tweet = require('../database/models/tweet.model');

exports.getTweets = () => {
  return Tweet.find({}).exec();
};

exports.getTweet = (tweetId) => {
  return Tweet.findOne({_id:tweetId}).exec();
}

exports.createTweet = (tw) => {
  const newTweet = new Tweet(tw);
  return newTweet.save();
};

// validator Mongoose (character limit not run by default)
exports.updateTweet = (twId, twBody) => {
  return Tweet.findByIdAndUpdate(twId, {$set: twBody}, {runValidators: true});
}

exports.deleteTweet = (twId) => {
  return Tweet.findByIdAndDelete(twId).exec()
};

// .populate() permet de remplacer un objectId par l'objet qui correspond à cet id
exports.getCurrentUserTweetsWithFollowing = (curUser) => {
  return Tweet.find({author: {$in: [...curUser.following, curUser._id]}}).populate('author').exec()
}

exports.getUserTweetsFromAuthorId = (authorId) => {
  return Tweet.find({author: authorId}).populate('author').exec();
}



