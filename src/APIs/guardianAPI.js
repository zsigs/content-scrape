require('dotenv').config();
const { News } = require('../models');
const { mongooseConnect } = require('../mongooseConnect');
const axios = require('axios');
const guardianAPI = process.env.guardian;
const mainURL = `https://content.guardianapis.com/search?api-key=${guardianAPI}&`;


mongooseConnect()
function getTags() {
  axios
    .get(`${mainURL}tag=environment/recycling`)
    .then(res => {
      // console.log(res.data.response.results);
      res.data.response.results.forEach(element => {
        console.log(element)
        News.find({ title: element.webTitle })
        .then(searchResult => {
          if (searchResult.length == 0) {
            console.log("entrei no if")
            News.create({
              title: element.webTitle,
              category: element.sectionName,
              mediaType: element.type,
              publicationDate: element.webPublicationDate,
              url: element.webUrl,
              firstParagraph: 'N/A',
              coverImg: 'N/A',
              source: 'The Guardian'
            })
              .then(res => console.log('succes!', res))
              .catch(err => console.log("error", err));
          } else {
            console.log(`News ${element.webTitle} already in DB`);
          }
        });
      });
    })
    .catch(err => console.log(err));
}
getTags();
