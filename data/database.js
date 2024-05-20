const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let database;
async function connect(){
    const client = await mongoClient.connect('mongodb://localhost:27017')
    database = client.db('demo-online-shop')
}

function getDb(){
    if (!database){
        throw new Error('Need to conect first!')
    }
    return database;
}

module.exports = {
    connectToDatabase : connect,
    getDb : getDb
}