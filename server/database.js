const MongoClient = require('mongodb').MongoClient

const URL = "mongodb://127.0.0.1:27017/";

class Database {
	connect(){
		return new Promise((resolve, reject) => {
			MongoClient.connect(URL, { useUnifiedTopology: true }, (err, db) => {
				var dbo = db.db("chatapp");
				this.db = dbo
				return err ? reject(err) : resolve(dbo);
            });
		});
	}
}

module.exports = Database