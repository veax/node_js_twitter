const { get } = require('mongoose');
const Tweet = require('../database/models/tweet.model');
const { getTweets, createTweet, deleteTweet, getTweet, updateTweet, getCurrentUserTweetsWithFollowing } = require('../queries/tweets.queries');

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getCurrentUserTweetsWithFollowing(req.user);
    res.render('tweets/tweet.pug', { tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user, editable: true });
  } catch (e) {
    next(e);
  }
};

exports.tweetNew = (req, res, next) => {
  res.render('tweets/tweet-form.pug', {tweet : {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
};

exports.tweetCreate = async (req, res, next) => {
  try {
    const body = req.body
    await createTweet({...body, author: req.user._id});
    res.redirect('/tweets');
  } catch (err) {
    const errors = Object.keys(err.errors).map((key) => err.errors[key].message);
    res.status(400).render('tweets/tweet-form', { errors, tweet : {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
};

exports.tweetEdit = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId
    console.log(tweetId)
    const tweet = await getTweet(tweetId);
    res.render('tweets/tweet-form', {tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
  } catch(e) {
    next(e)
  }
}


// validator Mongoose (character limit not run by default)
exports.tweetUpdate = async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    await updateTweet(tweetId, req.body);
    res.redirect('/tweets')
  } catch(e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    const tweet = await getTweet(tweetId);
    res.status(400).render('tweets/tweet-form', { errors, tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user, editable: true });
  }
}

exports.tweetDelete = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    await deleteTweet(tweetId);
    const tweets = await getCurrentUserTweetsWithFollowing(req.user);
    console.log(tweets)
    // send to front end generated html list of tweets : res.data
    res.render('tweets/tweets-list.pug', {tweets, currentUser: req.user, editable: true});
  } catch (e) {
    next(e)
  }
};
