const jwt = require('jsonwebtoken');
//const auth = require('../api/components/auth');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {   
    return jwt.sign(data, secret);
}

//Middleware para autorizacion a usuario utilizando JWT

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        
        //Comprobacion de usuario si es o no propio
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto own', 401);
        }
    },
    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    },
}

function verify(token) {
    return jwt.verify(token, secret)
}

function getToken(auth) {
    if(!auth) {
        throw Error('No viene token', 401);
    }

    if(auth.indexOf('Bearer ') === -1) {
        throw Error('Formato invalido', 401);
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
}