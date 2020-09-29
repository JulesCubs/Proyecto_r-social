const express = require('express');
const bodyParser = require('body-parser'); //para trabajar con el documento json. npm i body-parse

//const swaggerUI = require('swagger-ui-express'); Se podria usar en este archivo la aplicacion de documentacion (es opcional)

const config = require('../config.js')  //establezco un objeto para valores que se pueden cambiar y realizarlo desde un unico documento
const post = require('./components/post/network'); //llamo a componente network de post

const errors = require('../network/errors'); //Manejo de errores

const app = express(); //establezco a express en la variable de app

app.use(bodyParser.json()); //puedo usar json para establecer valores desde un docuemnto de ese formato

//const swaggerDoc = require('./swagger.json');

//ROUTER
app.use('/api/post', post); //Creacion de posts por usuario...

app.use(errors); //Debe ser el ultimo metodo para no dañar la aplicacion o perder ninguna ruta

app.listen(config.post.port, () => { //Escucha el router desde el puerto configurado
    console.log('Api desde el puerto ', config.post.port);
});