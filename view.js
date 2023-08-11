const fs = require('fs').promises;
const { EOL } = require('os');
const Model = require('./model');
const readlineSync = require('readline-sync');

class View {
  rightOutput() {
    console.log(`Отлично!${EOL}`);
  }

  falseOutput(questionsData) {
    console.log(`Правильный ответ: ${questionsData.answer}${EOL}`);
  }
}

module.exports = View;
