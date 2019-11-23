require('dotenv').config();
const axios = require('axios');
const randomeWords = require('random-words');
const { Movie } = require('../models');
const OMDbAPI = process.env.OMDb;
const mainURL = `http://www.omdbapi.com/?apikey=${OMDbAPI}`;

function dumpIMDB() {
  const words = randomeWords(1000);
  // Make a request for a user with a given ID
  words.forEach(word => {
    axios
      .get(`${mainURL}&s=${word}`)
      .then(function(response) {
        response.data.Search.forEach(element => {
          Movie.find({ imdbId: element.imdbID }).then(searchResult => {
            if (searchResult.length == 0) {
              Movie.create({
                title: element.Title,
                type: element.Type,
                imdbId: element.imdbID,
                poster: element.Poster
              })
                .then(res => {
                  console.log('succes!', res);
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              console.log(`Movie ${element.Title} already in DB`);
            }
          });
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
}

function getMoreMovieInfo() {
  Movie.find({  })
    .then(res => {
      console.log(res.length);
      for (let i = 0; i < res.length; i++){
      axios.get(`${mainURL}&i=${res[i].imdbId}`).then( async movieRes => {
        console.log(movieRes.data);
        const {
          Released,
          Runtime,
          Genre,
          Director,
          Actors,
          Plot,
          Language,
          imdbRating
        } = movieRes.data;
        const filter = { imdbId: movieRes.data.imdbID };
        const updateObj = {
          releaseDate: Released,
          runtime: Runtime,
          genre: Genre,
          director: Director,
          actors: Actors,
          plot: Plot,
          lang: Language,
          imdbRating: imdbRating
        };

        let mov = await Movie.findOneAndUpdate(filter, updateObj, {
          new: true
        });
        console.log(mov);
      });
    }
    })
    .catch(err => console.log(err));
}

module.exports = {
  dumpIMDB,
  getMoreMovieInfo
}