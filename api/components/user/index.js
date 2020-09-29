//const store = require('../../../store/dummy'); //Bd dummy mientras se obtiene un bd diferente
//const store = require('../../../store/mysql'); //BD mysql de freemysqlhosting
const store = require('../../../store/remote-mysql');

const controller = require('./controller');

module.exports = controller(store);