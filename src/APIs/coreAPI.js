const { mongooseConnect } = require('../mongooseConnect');
const { ResearchPaper } = require('../models');

const axios = require('axios');

const getPapers = (keyword) => {
  const url = `https://core.ac.uk/api-v2/search/${keyword}?page=1&pageSize=1&apiKey=fCx42DV08JiqWHKE5QmaMcgbLsOkheSR`
  axios.get(url)
  .then(response => {
    const { data } = response;
    for (let paper of data.data) {
      let pdf = paper._source.repositoryDocument.pdfOrigin;
      let authors = paper._source.authors;
      let datePublished = pare._source.datePublished;

      ResearchPaper.create({
        
      });
    };
  });
};

getPapers("machine-learning");