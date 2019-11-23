const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title : String,
  type : String,
  imdbId : String,
  poster : String,
  releaseDate : String,
  runtime : String,
  genre : String,
  director : String,
  actors : String,
  plot : String,
  lang : String,
  imdbRating : String

});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = {
  Movie,
}