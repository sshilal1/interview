var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/mydb";

var getDbObjects = function() {
	return new Promise((resolve,reject) => {
		mongoClient.connect(dbUrl, function(err, db) {
		  if (err) reject(err);
		  var mycollection = db.collection("reservations").find();
		  var myObjs = [];
		  mycollection.each(function(err, item) {
		  	if (item==null) {
		  		db.close();
		  		resolve(myObjs);
		  	}
		  	else {
		  		myObjs.push(item);
		  	}
		  })
		})
	})
}

var addReservation = function(reservation) {
	return new Promise((resolve,reject) => {
		mongoClient.connect(dbUrl, function(err, db) {
		  if (err) reject(err);
		  db.collection("reservations").insertOne(reservation, function(err, res) {
		    if (err) reject(err);
		    console.log('successfully added reservation!');
		    //resolve('successfully added reservation!');
		    getDbObjects()
				.then((data) => {
					resolve(data);
				})
		  });
		});
	})
}

var removeReservation = function(reservation) {
	return new Promise((resolve,reject) => {
		mongoClient.connect(dbUrl, function(err, db) {
			if (err) throw err;
		  db.collection("reservations").deleteOne(reservation, function(err, obj) {
		    if (err) throw err;
		    console.log(obj.result.n + " reservations deleted");
		    //resolve(obj.result.n + " reservations deleted");
		    getDbObjects()
				.then((data) => {
					resolve(data);
				})
		  });
		});
	})
}

var dropCollection = function() {
	mongoClient.connect(dbUrl, function(err, db) {
	  if (err) throw err;
	  db.collection("reservations").drop(function(err, delOK) {
	    if (err) throw err;
	    if (delOK) console.log("Collection deleted");
	    db.close();
	  });
	});
}

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req,res) {
	res.sendFile('index.html', { root: __dirname})
});

app.post('/reservation', function (req,res) {
	var myobj = req.body;
	console.log("Attempting to add reservation for", myobj);
	addReservation(myobj)
	.then(function(result) {
		res.send(result);
	})
})

app.delete('/reservation/:id', function (req,res) {
	var myobj = { id : req.params.id };
	console.log("Attempting to remove reservation for", myobj);
	removeReservation(myobj)
	.then(function(result) {
		res.send(result);
	})
})

app.listen(4000, function() {
	console.log("listening on port 4000");
})
