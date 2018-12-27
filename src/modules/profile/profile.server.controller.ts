

import {Request, Response} from 'express';
import {profileService} from "./profile.server.service";

export class ProfileController {

    constructor() {

    }

    create(req: Request, res: Response): void {
        let profileObject: any = req.body.data;

        profileService.create(profileObject)
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }

    get(req: Request, res: Response): void {

        profileService.get()
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }

    getById(req: Request, res: Response): void {
        let paramObject: any = req.params.id;

        profileService.getById(paramObject)
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }

    update(req: Request, res: Response): void {
        let paramValue: string = req.params.id;
        let profileObject: any = req.body.data;

        profileService.update(paramValue, profileObject)
            .then((data: Object) => {
                res.status(201).send({data: data});
            }, (error: Object) => {
                res.status(422).send({'error': error});
            });
    }


    
}

export const profileController: ProfileController = new ProfileController();
