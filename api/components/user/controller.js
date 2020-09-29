const {nanoid} = require('nanoid'); //Llamo a la libreria nanoId para generar id automaticas npm i nanoid
const auth = require('../auth'); //No estamos llamando a ningun componente espcifico sino traeremos al index 

const TABLA = 'user';

module.exports = function(injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache

    if(!store) {
        store = require('../../../store/dummy');
    }

    if(!cache) {
        store = require('../../../store/dummy');
    }

    async function list() {
        let users = await cache.list(TABLA);
        //console.log('Conectado a BD')
        if(!users) {
            console.log('No estaba en cache: Busca en BD');
            users = await store.list(TABLA);
            cache.upsert(TABLA, users);
        } else {
            console.log('datos traidos de cache');
        }

        return users;
    };

    function get(id) {
        return store.get(TABLA, id);
    };

    async function upsert(body) {
        const user = { //Creamos usuario
            name: body.name, 
            username: body.username,
        }

        if (body.id) { //Usamos id si viene creado sino se genera una automaticamente
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if(body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user);
    };

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_to'; // {user: 'user_to'} Para poder llevar los datos de user a user_to
        const query = {user_from: user};

        return await store.query(TABLA + '_follow', query, join);
    }

    return {
        list,
        get,
        upsert,
        follow,
        following,
    };
}