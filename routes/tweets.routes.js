const router = require('express').Router();
const {
  tweetList,
  tweetNew,
  tweetCreate,
  tweetEdit,
  tweetUpdate,
  tweetDelete,
} = require('../controllers/tweets.controller');

router.get('/', tweetList);
router.get('/new', tweetNew);
router.get('/edit/:tweetId', tweetEdit)
router.post('/update/:tweetId', tweetUpdate);
router.post('/', tweetCreate);

router.delete('/:tweetId', tweetDelete);
module.exports = router;
