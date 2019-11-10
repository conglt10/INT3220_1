const Token = require("./token")
const User = require("./user")
const Channel = require("./channel")
const Message = require("./message")
const Connection = require("./connection")

class Model {
    constructor(app) {
        this.app = app
        this.token = new Token(app)
        this.user = new User(app)
        this.channel = new Channel(app);
		this.message = new Message(app);
		this.connection = new Connection(app);
    }
}

module.exports = Model