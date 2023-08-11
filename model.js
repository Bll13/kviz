const fs = require('fs').promises;
const { EOL } = require('os');

class Model {
  async getThemes() {
    const arr = await fs.readdir('./topics', 'utf-8');
    const themes = arr.map((el) => el.split('.')[0]);
    console.log(themes);
    return themes;
  }

  async getQuestions(name) {
    const arr = await fs.readFile(`./topics/${name}`, 'utf-8');
    const questions = arr.split(EOL);
    const newArr = [];
    for (let i = 0; i < questions.length; i += 2) {
      const object = { question: '', answer: '' };
      object.question = questions[i];
      object.answer = questions[i + 1];
      newArr.push(object);
    }
    console.log(newArr);
    return newArr;
  }
}
// const test = new Model();
// test.getQuestions('otter_flashcard_data.txt');
// test.getThemes();
module.exports = Model;
