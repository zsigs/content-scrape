const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: String,
  category: String,
  mediaType: String,
  publicationDate: Date,
  url: String,
  firstParagraph: String,
  coverImg: String,
  source: String
})


const News = mongoose.model("News", newsSchema);

module.exports = {
  News,
}