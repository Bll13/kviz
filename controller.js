const readlineSync = require('readline-sync');
const { EOL } = require('os');
const chalk = require('chalk');

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  play() {
    console.log(chalk.bold(`${EOL}ЗДРАВСТВУЙТЕ, ЛЮДИ!`));
    this.model.getThemes().then(async (themesData) => {
      const userName = readlineSync.question(chalk.bold.blue('Введите имя: '));
      const themeIndex = readlineSync.keyInSelect(
        themesData,
        `Выберите тему: ${EOL}`
      );
      const questionsData = await this.model.getQuestions(themeIndex);
      let count = 0;
      for (let i = 0; i < questionsData.length; i++) {
        const answer = readlineSync.question(
          `${questionsData[i].question}${EOL}`
        );
        if (this.model.checkRightAnswer(answer, questionsData[i])) {
          this.view.rightOutput();
          count += 100;
        } else this.view.falseOutput(questionsData[i]);
      }

      if (count < 500) {
        console.log(
          chalk.magenta(
            `${userName}! ПОЗДРАВЛЯЮ, ТЫ ОТЧИСЛЕН! Твой результат: ${count} из 500`
          )
        );
      } else {
        console.log(
          chalk.yellowBright(
            `${userName}! Поздравляю! Ты не отчислен! Твой результат: ${count} из 500`
          )
        );
      }
    });
  }
}

module.exports = Controller;
