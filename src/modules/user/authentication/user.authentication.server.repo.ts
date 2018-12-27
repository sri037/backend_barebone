import {userModel} from "../user.model";
import {UserDocument} from "../user.type";
import {Document} from 'mongoose';
import {error} from "util";
import * as jwt from 'jsonwebtoken';
import {ENV} from "../../../environments/environment.default";


export class UserAuthenticationRepo {

    constructor() {

    }

    public async findUser(query: any): Promise<any> {
        try {
            let user = userModel.findOne(query);

            return user;
        } catch (e) {

            return e;
        }
    }

    public signUp(userObj: UserDocument): Promise<any> {
        return new Promise<any>( (resolve: any, reject: any): any => {
            const user: Document = new userModel(userObj);
            user.save(async (err: any, userDocument: any) => {
                if (err) {
                    return reject(err);
                } else {
                    // sanitize user Object
                    let user: UserDocument = await this.sanitizeUserObject(userDocument);

                    return resolve(user);
                }
            });
        });
    }

    public authenticateUser(userObject: UserDocument, password: string): any {
        return new Promise<any>(async (resolve: any, reject: any): Promise<any> => {
            if ((userObject as any).authenticate(password)) {

                return resolve(userObject);
            } else {
                return reject({
                    CODE: 'INVALID_USERNAME_OR_PASSWORD',
                    HTTP_CODE: 401
                });
            }
        });
    }

    public generateJWT(user: UserDocument): any {
        return new Promise<any>((resolve, reject) => {
            let payload : Object = {
                userId: user._id,
                role: user.roles
            };
            let token: any = jwt.sign(payload, ENV.jwt_secret);

            return resolve(token);
        });
    }

    public updateUser(userObj: any): Promise<any> {
        return new Promise<any>((resolve: any, reject: any): any => {
            userObj.save((err: any, userDocument: UserDocument) => {
                if (err) {

                    return reject(error);
                } else {
                    return resolve(userDocument);
                }
            });
        });
    }

    public sanitizeUserObject(user: UserDocument): Promise<any> {
        return new Promise<any>(resolve => {
            user['password'] = undefined;
            user['salt'] = undefined;

            return resolve(user);
        });
    }
}

export const userAuthenticationRepo: UserAuthenticationRepo = new UserAuthenticationRepo();
