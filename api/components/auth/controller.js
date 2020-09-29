const bcrypt = require('bcryptjs');

const auth = require('../../../auth')

let TABLA = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        //Autenticar a todos los valores usando username para validar si no se encuentran repetidos en la funcion query de dummy.js
        const data = await store.query(TABLA, { username: username });
        console.log("Aqui entra a controller", password, data.password);

        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    console.log("Si entra a la condicion", data.password);
                    //generar token
                    return auth.sign({ ...data});
                } else {
                    throw new Error('Informacion no corresponde');
                }
            })
    }

    async function upsert(data) { //Con esta funcion al conectarse con la bd solo se actualiza lo que necesita y no todo
        const authData = {
            id: data.id,
        }

        if(data.username) {
            authData.username = data.username;
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 5); //Hay que pasar el numero de veces que se puede hash el algoritmo entre 5 y 10 esta bien
        }

        return store.upsert(TABLA, authData);
    }

    return {
        login,
        upsert,
    };
};