//const store = require('../../../store/dummy'); //Bd dummy mientras se obtiene un bd diferente
//const store = require('../../../store/mysql'); //BD mysql de freemysqlhosting
const config = require('../../../config');

let store;
if(config.remoteDB === true) {
    store = require('../../../store/remote-mysql');
} else {
    store = require('../../../store/mysql');
}

const controller = require('./controller');

module.exports = controller(store);