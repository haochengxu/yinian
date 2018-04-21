var request = require('superagent');
var cheerio = require('cheerio')
var MongoClient = require('../lib/mongo').mongoClient
var insertDocuments = require('../lib/mongo').insertDocuments
var mongoUrl = require('../config/index.js').mongodb
var collection = 'sina_blog'

var startUrl = 'http://blog.sina.com.cn/s/blog_5b4d23f60102x4us.html'

function crawl(url) {
    request.get(url)
        .set('Accept', 'application/html')
        .end(function(err, res) {
            // console.log(res.text)
            let $ = cheerio.load(res.text)
            let documentObj = {}

            documentObj.url = url
            documentObj.title = $('.articalTitle h2').text()
            documentObj.content = $('#sina_keyword_ad_area2').text()
            documentObj.createTime = $('.time').text().slice(1, -1)
            documentObj.class = $('.articalTag .blog_class a').text()
            documentObj.classUrl = $('.articalTag .blog_class a').attr('href')

            // console.log(documentObj.title)
            // console.log(documentObj.content)
            // console.log(documentObj.createTime)
            // console.log(documentObj.url)

            MongoClient.connect(mongoUrl, function(err, client) {
                const db = client.db('yinian')
                insertDocuments(db, collection, documentObj, function() {
                    console.log('end')
                    client.close();
                });
            });
            console.log(123)
            console.log($('.articalfrontback a').text())
            if ($('.articalfrontback a').text() != '') {
                console.log('enter')
                nextUrl = $('.articalfrontback a').attr('href')
                console.log(nextUrl)
                setTimeout(() => {
                    crawl(nextUrl)
                }, 3000)
            }
        })
}
crawl(startUrl)