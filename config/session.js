const session = require('express-session')
const mongodbStore = require('connect-mongodb-session')

function createSessionStore(){
    const mongoDBStore = mongodbStore(session)
    const sessionStore = new mongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'demo-online-shop',
        collection: 'sessions'
    })
    return sessionStore;
}

function createSessionConfig(){
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        }
    }
}

module.exports = createSessionConfig;