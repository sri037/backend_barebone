import {USER_MODEL} from "../user.model";
import {UserDocument} from "../user.type";
import {Document, Types} from 'mongoose';


export class UserAuthenticationRepo {

    constructor() {

    }

    public async findUser(query: any): Promise<any> {
        try {
            let user = USER_MODEL.findOne(query);

            return user;
        } catch (e) {

            return e;
        }
    }

    public signUp(userObj: UserDocument): any {
        return new Promise((resolve: any, reject: any): any => {
            const user: Document = new USER_MODEL(userObj);
            user.save((err: any, userDocument: any) => {
                if (err) {
                    return reject(err);
                } else {
                    // Remove sensitive data
                    userDocument['password'] = undefined;
                    userDocument['salt'] = undefined;

                    return resolve(userDocument);
                }
            });
        });
    }
}

export const USER_AUTHENTICATION_REPO: UserAuthenticationRepo = new UserAuthenticationRepo();
