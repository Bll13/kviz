const Model = require('./model');
const View = require('./view');
const Controller = require('./controller');

const model = new Model();
const view = new View();

const game = new Controller(model, view);

game.play();
