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

app.post('/reservation', function (req,res) {
	var myobj = req.body;
	console.log("Attempting to add reservation for", myobj);

	mongoClient.connect(dbUrl, function(err, db) {
	  if (err) throw err;
	  db.collection("reservations").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("reservation added!");
	    db.close();
	  });
	});
})

app.delete('/reservation/:id', function (req,res) {
	var myobj = { id : req.params.id };
	console.log("Attempting to remove reservation for", myobj);

	mongoClient.connect(dbUrl, function(err, db) {
		if (err) throw err;
	  db.collection("reservations").deleteOne(myobj, function(err, obj) {
	    if (err) throw err;
	    console.log(obj.result.n + " reservations deleted");
	    db.close();
	  });
	});
})

app.listen(3000, function() {
	console.log("listening on port 3000");
})