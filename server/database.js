const MongoClient = require('mongodb').MongoClient

const URL = "mongodb://127.0.0.1:27017/chatapp";

class Database {
	connect(){
		return new Promise((resolve, reject) => {
			MongoClient.connect(URL, (err, db) => {
				return err ? reject(err) : resolve(db);
			});
		});
	}
}

module.exports = Database