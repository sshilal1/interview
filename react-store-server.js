var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/mydb";

app.use(express.static('react-store-public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req,res) {
	res.sendFile('index.html', { root: __dirname})
});

app.listen(3000, function() {
	console.log("listening on port 3000");
})