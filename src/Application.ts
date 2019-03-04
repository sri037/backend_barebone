import * as express from 'express'
import * as hbs from 'express-hbs';
import * as bodyParser from 'body-parser';

import {api} from './modules/index';

import {connectToDb} from './modules/utils/mongoose';
import { EnvironmentInterface } from './environments/environment.interface';
import * as path from "path";


class Application {
    public express;
    public env = './environments/environment';
    public envObject: EnvironmentInterface;

    constructor() {
        let buildEnv = process.env.BUILD_ENV !== undefined ? '.' + process.env.BUILD_ENV  : '';
        this.env = this.env + buildEnv;
        this.envObject = require(this.env)
        console.log(this.envObject);

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

        // Load Angular project
        app.use(express.static('public/www'));

        app.use('/public', express.static(path.resolve(__dirname, '../public')));
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
