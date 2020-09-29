const db = {
    'user': [
        //{ id: '1', name: 'Julian' },
    ],
};

async function list(tabla) {
    console.log(db);
    return db[tabla] || []; //Al retornar el array si no viene nada se devuelve vacio
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }
    db[tabla].push(data);

    console.log(db);
}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q); //Para filtrar estoy cogiendo un solo parametro,
    let key = keys[0];
    console.log(tabla, q, col, keys, key)
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};