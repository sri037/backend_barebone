import * as express from 'express'
import * as hbs from 'express-hbs';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import {api} from './modules/index';

import {connectToDb} from './modules/utils/mongoose';


class Application {
    public express;

    constructor() {
        this.express = express();
        this._loadConfig();
        this._mountRoutes();
        this._loadRoutes();
        this._connectToDb();
    }

    private _connectToDb() {
        connectToDb();
    }

    private _mountRoutes(): void {
        this.express.get('/', (req: any, res: any) => {
            res.json({
                message: 'Server is up and running!'
            })
        });
    }

    private _loadRoutes(): void {
        this.express.use('/api/v1', api);
    }

    private _loadConfig() {
        let app = this.express;

        /*
        * Adding a view engine.
        */
        app.engine('server.view.html', hbs.express4({
            extname: '.server.view.html'
        }));
        app.set('view engine', 'server.view.html');

        // To parse the payload
        app.use(bodyParser.urlencoded({extended: false}));

        app.use(bodyParser.json());

    }
}

export default new Application().express;
