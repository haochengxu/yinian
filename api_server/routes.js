var express = require('express');
var router = express.Router();
var mongoUrl = require('../config/index.js').mongodb
var MongoClient = require('../lib/mongo').mongoClient
var findDocuments = require('../lib/mongo').findDocuments
var collection = 'sina_blog'

router.get('/search', function (req, res) {
    // console.log(req.query)
    MongoClient.connect(mongoUrl, function (err, client) {
        const db = client.db('yinian')
        findDocuments(db, collection, function (doc) {
            console.log(doc)
            res.send(doc)
            client.close();
        });
    });
}, function (error) {
    console.trace(error.message);
});




module.exports = router;