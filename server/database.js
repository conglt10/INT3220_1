const MongoClient = require('mongodb').MongoClient

const URL = "mongodb://localhost:27017/chatapp";

exports.Database = class Database {
	connect(){
		return new Promise((resolve, reject) => {
			MongoClient.connect(URL,{useUnifiedTopology: true}, (err, db) => {
				return err ? reject(err) : resolve(db);
            });
		});
	}
}