const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

//Separamos las rutas de las funciones haciendo un llamado mas legible
//Routes -- Rutas
router.get('/', list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

//Funciones internas
function list(req, res, next) {  //Manejo de errores con next en secure.js para no hacer una funcion a cad metodo sino centralizar en el middleware
    //res.send('Todo funciona');
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
};

function get(req, res, next) {
    //res.send('Todo funciona');
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
};

function upsert(req, res, next) {
    //res.send('Todo funciona');
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
};

function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req ,res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
    return controller.following(req.params.id)
        .then((data) => {
            return response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;