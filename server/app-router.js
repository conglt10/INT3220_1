const moment = require("moment")
const _ = require("lodash")

const START_TIME = new Date();

exports = START_TIME

class AppRouter {
    constructor(app) {
        this.app = app;
        this.setupRouter = this.setupRouter.bind(this);
        this.setupRouter();
    }
    setupRouter() {
        const app = this.app;
        app.get("/",(req, res) => {
            res.send("Server working!!!")
        })
    }
}
module.exports = AppRouter;