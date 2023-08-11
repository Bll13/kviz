const fs = require('fs').promises;
const { EOL } = require('os');

class Model {
  constructor(themes = []) {
    this.themes = themes;
  }
  
  async getThemes() {
    const arr = await fs.readdir('./topics', 'utf-8');
    const themes = arr.map((el) => el.split('.')[0]);
    // console.log(themes);
    this.themes = themes;
    return themes;
  }

  async getQuestions(index) {
    await this.getThemes();
    const arr = await fs.readFile(`./topics/${this.themes[index]}.txt`, 'utf-8');
    const questions = arr.split(EOL);
    const newArr = [];
    for (let i = 0; i < questions.length; i += 2) {
      const object = { question: '', answer: '' };
      object.question = questions[i];
      object.answer = questions[i + 1];
      newArr.push(object);
    }
    //console.log(newArr);
    return newArr;
  }
}
const test = new Model();
test.getQuestions(1);
test.getThemes();
module.exports = Model;
