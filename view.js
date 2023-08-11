const fs = require('fs').promises;
const { EOL } = require('os');
const Model = require('./model');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

class View {
  rightOutput() {
    console.log(chalk.bold.green(`Отлично!${EOL}`));
  }

  falseOutput(questionsData) {
    console.log(chalk.bold.red(`Правильный ответ: ${questionsData.answer}${EOL}`));
  }
}

module.exports = View;
