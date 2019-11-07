const http = require("http")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const version = require("./package.json").version
const WebSocketServer = require("ws")
const Server = WebSocketServer.Server
const AppRouter = require("./app-router")
const Model = require("./models/model")
const Database = require("./database")
const path = require("path")

const PORT = 3001;
const app = express();
app.server = http.createServer(app);

app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.wss = new Server({
	server: app.server
});

const wwwPath = path.join(__dirname, 'www');

app.use('/', express.static(wwwPath));

// Connect to Mongo Database

new Database.Database().connect().then((db) => {
	console.log("Successful connected to database.")
	app.db = db;
}).catch((err) => {
    console.log(`Faile connect to database: ${err}`)
    throw(err);
});

app.models = new Model(app);
app.routers = new AppRouter(app);

app.server.listen(process.env.PORT || PORT, () => {
        console.log(`App is running on port ${app.server.address().port}`);
});
