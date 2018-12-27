const index = require('readline');
import * as fs from 'fs';

const rl = index.createInterface({
    input: process.stdin,
    output: process.stdout
});

let files: any = [
    'server.controller',
    'server.service',
    'server.routes',
    'server.model',
    'server.repo'
];

rl.question('Module Name Please: ', (moduleName) => {


    let modulePath = './src/modules/' + moduleName;
    let indexPath = './src/modules/';


    if (!fs.existsSync(modulePath)) {
        fs.mkdirSync(modulePath);
    // } else {
        for (let type of files) {
            let data = '';
            switch (type) {
                case 'server.model': {
                    data = modelGenerator(moduleName);
                    break;
                }
                case 'server.routes': {
                    data = routeGenerator(moduleName);
                    break;
                }
                case 'server.controller': {
                    data = controllerGenerator(moduleName);
                    break;
                }
                case 'server.service': {
                    data = serviceGenerator(moduleName);
                    break;
                }
                case 'server.repo': {
                    data = repoGenerator(moduleName);
                    break;
                }

            }

            fs.writeFile(indexPath + `${moduleName}/${moduleName}.${type}.ts`, data, function (err) {
                if (err) throw err;
            });

        }
    } else {
        console.log('Module already exists.');
    }


    rl.close();
});


function routeGenerator(moduleGenerate) {
    let moduleName = moduleGenerate.toLowerCase();
    return (`
import {Router} from 'express';
import {${moduleName}Controller} from './${moduleName}.server.controller';
import {jwtAuthenticationMiddleware} from '../utils/middleware/jwt-authentication';

export const ${moduleName}Route: Router = Router();

// By id
${moduleName}Route.get('/:id', ${moduleName}Controller.getById);
// All
${moduleName}Route.get('/', ${moduleName}Controller.get);
// Update
${moduleName}Route.put('/:id', ${moduleName}Controller.update);
// Create
${moduleName}Route.post('/', ${moduleName}Controller.create);
`);
}

function modelGenerator(moduleGenerate) {
    let modelName = moduleGenerate.charAt(0).toUpperCase() + moduleGenerate.slice(1);
    return (`
import { Schema, model, Model, Document } from 'mongoose';
export class ${modelName}Model extends Schema {

    constructor() {

        const ${moduleGenerate}: any = super({
            name: {type: String},
            status: {type:Boolean},
            created: { type: Date, default: (): Date => new Date() },
            updated: { type: Date }
            });
        }
    }

let ${moduleGenerate}: ${modelName}Model = new ${modelName}Model();
export const ${moduleGenerate}Model: Model<Document> = model('${moduleGenerate}s', ${moduleGenerate});`);
}


function repoGenerator(moduleGenerate) {
    let modelName = moduleGenerate.charAt(0).toUpperCase() + moduleGenerate.slice(1);
    let moduleName = moduleGenerate.toLowerCase();
    return (`
import {Document} from "mongoose";
import {${moduleName}Model} from "./${moduleName}.server.model";
import {error} from "util";

export class ${modelName}Repo {
    constructor() {

    }

    public create(${moduleName}Object: any): Promise<any> {
        return new Promise<any>( (resolve: any, reject: any): any => {
            const ${moduleName}: Document = new ${moduleName}Model(${moduleName}Object);
            ${moduleName}.save(async (err: any, ${moduleName}Document: any) => {
                if (err) {
                    return reject(err);
                } else {
                    // sanitize user Object
                    return resolve(${moduleName}Document);
                }
            });
        });
    }

    public update(${moduleName}Object: any): Promise<any> {
        return new Promise<any>((resolve: any, reject: any): any => {
            ${moduleName}Object.save((err: any, ${moduleName}Document: any) => {
                if (err) {

                    return reject(error);
                } else {
                    return resolve(${moduleName}Document);
                }
            });
        });
    }

    public async find(query: any): Promise<any> {     
        try {
            let user = ${moduleName}Model.find(query);

            return user;
        } catch (e) {

            return e;
        }
    }
}

export const ${moduleName}Repo: ${modelName}Repo = new ${modelName}Repo();
    `);
}


function controllerGenerator(moduleGenerate) {
    let modelName = moduleGenerate.charAt(0).toUpperCase() + moduleGenerate.slice(1);
    let moduleName = moduleGenerate.toLowerCase();
    return (`

import {Request, Response} from 'express';
import {${moduleName}Service} from "./${moduleName}.server.service";

export class ${modelName}Controller {

    constructor() {

    }

    create(req: Request, res: Response): void {
        let ${moduleName}Object: any = req.body.data;

        ${moduleName}Service.create(${moduleName}Object)
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }

    get(req: Request, res: Response): void {

        ${moduleName}Service.get()
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }

    getById(req: Request, res: Response): void {
        let paramObject: any = req.params.id;

        ${moduleName}Service.getById(paramObject)
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }

    update(req: Request, res: Response): void {
        let paramValue: string = req.params.id;
        let ${moduleName}Object: any = req.body.data;

        ${moduleName}Service.update(paramValue, ${moduleName}Object)
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }


    
}

export const ${moduleName}Controller: ${modelName}Controller = new ${modelName}Controller();
`);

}

function serviceGenerator(moduleGenerate) {
    let modelName = moduleGenerate.charAt(0).toUpperCase() + moduleGenerate.slice(1);
    let moduleName = moduleGenerate.toLowerCase();
    return(`
import {${moduleName}Repo} from './${moduleName}.server.repo';
import {Types} from "mongoose";
import * as _ from 'lodash';

export class ${modelName}Service {

    constructor() {

    }

    public async create(${moduleName}Object: any): Promise<any> {
        try {
            let ${moduleName}Document: any = await ${moduleName}Repo.create(${moduleName}Object);
            return ${moduleName}Document;
        } catch (e) {
            throw e;
        }
    }

    public async update(id: any, ${moduleName}Object: any): Promise<any> {
        try {
            let ${moduleName}: any = await ${moduleName}Repo.find({'_id': Types.ObjectId(id)});
            let newObj = _.assignIn(${moduleName}[0], ${moduleName}Object);

            let updatedObj: any = await ${moduleName}Repo.update(newObj);
            return updatedObj;
        } catch (e) {
            throw e;
        }
    }

    public async getById(id: any): Promise<any> {
        try {
            let ${moduleName}Obj: any = await ${moduleName}Repo.find({'_id': Types.ObjectId(id)});

            return ${moduleName}Obj;
        } catch (e) {
            throw e;
        }
    }


    public async get(): Promise<any> {
        try {
            let ${moduleName}List: any = await ${moduleName}Repo.find({});

            return ${moduleName}List;
        } catch (e) {
            throw e;
        }
    }

}

export const ${moduleName}Service: ${modelName}Service = new ${modelName}Service();`);
    
}