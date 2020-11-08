const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chapterSchema = schema({
  title: String,
  index: Number,
  nbOfLessons: Number,
  active: Boolean,
  infos: { type: {}, default: { author: 'Nathalie' } },
});

const Chapters = mongoose.model('chapters', chapterSchema);

mongoose
  .connect('mongodb://alex:qwe@127.0.0.1:27017/dyma', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connection OK');

    Chapters.findOne({ title: 'MongoDB' });
    // ------- QUERIES
    Chapters.find({}, (err, docs) => {
      console.log(docs);
    });
    // ------- CREATION
    // const newChapter = new Chapters({ active: true });
    // newChapter.title = 'MongoDB';
    // newChapter.nbOfLessons = 15;

    // newChapter.save((err, doc) => {
    //   console.log(doc);
    // });
  })
  .catch((err) => console.log(err));
