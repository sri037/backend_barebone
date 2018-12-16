import {UserDocument} from "../user.type";
import {USER_AUTHENTICATION_SERVICE} from "./user.authentication.server.service";

export class UserAuthenticationController {

    constructor() {

    }

    public signUp(req: any, res: any): void {
        let userObject: UserDocument = req.body.data;
        console.log(userObject);
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

            USER_AUTHENTICATION_SERVICE.signUp(userObject, req, res)
                .then((data: Object) => {
                    res.status(201).send({data: data});
                }, (error: Object) => {
                    res.status(422).send({'error': error});
                });
        }
    }
}


export const USER_AUTHENTICATION_CONTROLLER: UserAuthenticationController = new UserAuthenticationController();