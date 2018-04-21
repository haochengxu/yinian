var mongoClient = require('mongodb').MongoClient

function getRandomNo(docs) {
    return Math.floor(Math.random() * docs.length)
}
var insertDocuments = function(db, collectionName, doc, callback) {
    // Get the documents collection
    var collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany([doc], function(err, result) {
        callback(result);
    });
}
var findDocuments = function(db, collec, callback) {
    // Get the documents collection
    console.log(collec)
    var collection = db.collection(collec);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        console.log(docs.length)
        console.log(getRandomNo(docs.length));
        callback(docs[getRandomNo(docs)]);
    });
}

module.exports = {
    mongoClient,
    insertDocuments,
    findDocuments
}