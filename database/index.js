require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI_TWITTER_DB = process.env.MONGODB_URI_TWITTER_DB;
mongoose
  .connect(
    MONGODB_URI_TWITTER_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
  )
  .then(() => console.log('connection bd OK'))
  .catch((err) => console.log(err));
