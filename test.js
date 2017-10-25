var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var mycollection = db.collection("reservations").find();
  
  mycollection.each(function(err, item) {
  	if (item==null) {
  		db.close();
  		return;
  	}
  	console.log(item);
  })
});