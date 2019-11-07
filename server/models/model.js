const Token = require("./token")
const User = require("./user")

class Model {
    constructor(app) {
        this.app = app
        this.token = new Token(app)
        this.user = new User(app)
    }
}

module.exports = Model