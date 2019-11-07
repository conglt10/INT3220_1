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
        console.log("APp ROuter works!");
        app.get("/",(req, res) => {
            res.send("Server working!!!")
        })
        /**
         * @endpoint: /api/users
         * @method: POST
         **/
        app.post('/api/users', (req, res, next) => {
            const body = req.body;
            app.models.user.create(body).then((user) => {
                _.unset(user, 'password');
                return res.status(200).json(user);
            }).catch(err => {
                return res.status(503).json({error: err});
            })
        });
        /**
         * @endpoint: /api/users/me
         * @method: GET
         **/
        app.get('/api/users/me', (req, res, next) => {
            let tokenId = req.get('authorization');
            if (!tokenId) {
                // get token from query
                tokenId = _.get(req, 'query.auth');
            }
            app.models.token.loadTokenAndUser(tokenId).then((token) => {
                _.unset(token, 'user.password');
                return res.json(token);
            }).catch(err => {
                return res.status(401).json({
                    error: err
                })
            });
        });
        /**
         * @endpoint: /api/users/search
         * @method: POST
         **/
        app.post('/api/users/search', (req, res, next) => {
            const keyword = _.get(req, 'body.search', '');
            app.models.user.search(keyword).then((results) => {
                return res.status(200).json(results);
            }).catch((err) => {
                return res.status(404).json({
                    error: 'Not found.'
                })
            })
        });
        /**
         * @endpoint: /api/users/:id
         * @method: GET
         **/
        app.get('/api/users/:id', (req, res, next) => {
            const userId = _.get(req, 'params.id');
            app.models.user.load(userId).then((user) => {
                _.unset(user, 'password');
                return res.status(200).json(user);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                })
            })
        });
        /**
         * @endpoint: /api/users/login
         * @method: POST
         **/
        app.post('/api/users/login', (req, res, next) => {
            const body = _.get(req, 'body');
            app.models.user.login(body).then((token) => {
                _.unset(token, 'user.password');
                return res.status(200).json(token);
            }).catch(err => {
                return res.status(401).json({
                    error: err
                })
            })
        })   
    }
}
module.exports = AppRouter;