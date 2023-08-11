const fs = require('fs').promises;
const { EOL } = require('os');

class Model {
  constructor(themes = []) {
    this.themes = themes;
  }

  async getThemes() {
    const arr = await fs.readdir('./topics', 'utf-8');
    const themes = arr.map((el) => el.split('.')[0]);
    this.themes = themes;
    return themes;
  }

  async getQuestions(index) {
    await this.getThemes();
    const arr = await fs.readFile(
      `./topics/${this.themes[index]}.txt`,
      'utf-8'
    );
    const questions = arr.split(EOL);
    const newArr = [];
    for (let i = 0; i < questions.length; i += 2) {
      const object = { question: '', answer: '' };
      object.question = questions[i];
      object.answer = questions[i + 1];
      newArr.push(object);
    }
    return newArr;
  }

  checkRightAnswer(userAnswer, questionsData) {
    if (
      userAnswer.trim().toLowerCase() ===
      questionsData.answer.trim().toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Model;
