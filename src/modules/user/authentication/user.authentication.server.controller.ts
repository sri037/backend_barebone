import {UserDocument} from "../user.type";
import {userAuthenticationService} from "./user.authentication.server.service";
import {Request, Response} from 'express';

export class UserAuthenticationController {

    constructor() {

    }

    public signUp(req: Request, res: Response): void {
        let userObject: UserDocument = req.body.data;
        if ((!userObject.hasOwnProperty('email')) || userObject.email === '') {

            res.status(422).json({
                error: {
                    CODE: 'EMAIL_IS_MISSING'
                }
            });

        } else if ((!userObject.hasOwnProperty('password')) || userObject.password === '') {

            res.status(422).json({
                error: {
                    CODE: 'PASSWORD_IS_MISSING'
                }
            });

        } else {

            userAuthenticationService.signUp(userObject, req, res)
                .then((data: Object) => {
                    res.status(201).send({data: data});
                }, (error: Object) => {
                    res.status(422).send({'error': error});
                });
        }
    }

    public activateAccount(req: Request, res: Response): void {

        let activateAccountObj = {
            verificationToken: req.params.token,
            userId: req.params.userId
        };

        userAuthenticationService.activateAccount(activateAccountObj)
            .then((data: Object) => {

                res.status(201).send({data: data});

            }, (error: Object) => {
                let errorCode: number = error.hasOwnProperty('HTTP_CODE') ? error['HTTP_CODE'] : 422;
                res.status(errorCode)
                    .send({ 'error': error });
            });
    }

    public signIn(req: Request, res: Response): void {
        let userObj: any = req.body.data;
        if (!userObj.hasOwnProperty('email') || userObj['email'] === '') {
            res.status(422)
                .json({
                    error: {
                        CODE: 'EMAIL_IS_MISSING'
                    }
                });
        } else if (!userObj.hasOwnProperty('password') || userObj['password'] === '') {
            res.status(422)
                .json({
                    error: {
                        CODE: 'PASSWORD_IS_MISSING'
                    }
                });
        } else {
            userAuthenticationService.signIn(userObj)
                .then((data: Object) => {
                    res.status(200)
                        .send({
                            data: data
                        });

                }, (err: Object) => {
                    if (err['name'] == 'AuthenticationError') {
                        res.status(422)
                            .send({ 'error': err });
                    } else {
                        res.status(422)
                            .send({ 'error': err });
                    }
                });
        }
    }
}


export const userAuthenticationController: UserAuthenticationController = new UserAuthenticationController();