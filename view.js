const fs = require('fs').promises;
const Model = require('./model');
const readlineSync = require('readline-sync');

const themes = new Model();
themes.getThemes().then((data) => {
  const index = readlineSync.keyInSelect(data, 'Which topic?');
  themes.getQuestions(index).then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      console.log(data[i].question);
    }
  });
});

// module.exports = View;
