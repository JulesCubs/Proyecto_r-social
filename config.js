module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!!!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql10.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql10367668',
        password: process.env.MYSQL_PASS || 'teG6mT4ib5',
        database: process.env.MYSQL_DB || 'sql10367668',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host: process.env.CACHE_SRV_HOST || 'localhost',
        port: process.env.CACHE_SRV_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-16505.c238.us-central1-2.gce.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 16505,
        password: process.env.REDIS_PASS || 'chjGg3QxNVYVuYPBL4ITKUbJyfC1H2h0',
    }
}

