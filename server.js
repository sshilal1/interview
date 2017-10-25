var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/mydb";

class Api {
	getObjets () {
		return new Promise((resolve,reject) => {
			mongoClient.connect(dbUrl, function(err, db) {
			  if (err) throw err;
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
			});
		})
	}
}

var getDbObjects = function() {
	mongoClient.connect(dbUrl, function(err, db) {
	  if (err) throw err;
	  var mycollection = db.collection("reservations").find();
	  var myObjs = [];
	  mycollection.each(function(err, item) {
	  	if (item==null) {
	  		db.close();
	  		console.log(myObjs);
	  		return myObjs;
	  	}
	  	myObjs.push(item);
	  })
	});
}

var dropDb = function() {
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

	var dbObjs = getDbObjects();
	console.log(dbObjs);

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
	    //console.log(obj.result.n + " reservations deleted");
	    console.log(obj.result);
	    db.close();
	  });
	});
})

app.listen(4000, function() {
	console.log("listening on port 3000");
})

async function getStuff () {
  const api = new Api()
  const objs = await api.getObjets()
  console.log(objs);
}

getStuff();