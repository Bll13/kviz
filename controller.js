const readlineSync = require('readline-sync');
const { EOL } = require('os');

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  play() {
    console.log(`${EOL}Здравствуйте, ЛЮДИ!`);
    this.model.getThemes().then(async (themesData) => {
      const userName = readlineSync.question('Введите имя: ');
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
      console.log(`${userName}! Спасибо! Твой результат: ${count}`);
    });
  }
}

module.exports = Controller;
