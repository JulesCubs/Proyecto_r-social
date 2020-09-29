const express = require('express');
const bodyParse = require('body-parser'); //para trabajar con el documento json. npm i body-parse

const swaggerUI = require('swagger-ui-express');

const config = require('../config.js')  //establezco un objeto para valores que se pueden cambiar y realizarlo desde un unico documento
const user = require('./components/user/network'); //llamo a componente network de user
const auth = require('./components/auth/network'); //llamo a componente network de auth
//const post = require('./components/post/network'); //llamo a componente network de post  Se llama como un microservicio y queda alojado en /Proyecto_r-social/posts/..

const errors = require('../network/errors'); //Manejo de errores

const app = express(); //establezco a express en la variable de app

app.use(bodyParse.json()); //puedo usar json para establecer valores desde un docuemnto de ese formato

const swaggerDoc = require('./swagger.json');

//ROUTER
app.use('/api/user', user); //Creo un usuario desde la direccion y registro...
app.use('/api/auth', auth); //Autentico al usuario ...
//app.use('/api/post', post); //Creacion de posts por usuario... Se llama como un microservicio y queda alojado en /Proyecto_r-social/posts/..
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));  //Adjunto la documentacion y comentarios de l aplicacion en un archivo Json que se llama en la linea 4 y 13

app.use(errors); //Debe ser el ultimo metodo para no dañar la aplicacion o perder ninguna ruta

app.listen(config.api.port, () => { //Escucha el router desde el puerto configurado
    console.log('Api desde el puerto ', config.api.port);
});