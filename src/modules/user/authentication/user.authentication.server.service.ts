import {UserDocument} from "../user.type";
import {userAuthenticationRepo} from "./user.authentication.server.repo";
import {UserConstant} from '../user.constant';
import * as crypto from 'crypto';
import {Request, Response} from 'express';

import {Types} from "mongoose";
import {sendEmail} from "../../utils/send-email";


export class UserAuthenticationService {

    constructor() {

    }

    public async signUp(userObject: UserDocument, req: Request, res: Response): Promise<any> {
        try {
            let userExists = await userAuthenticationRepo.findUser({'email': userObject.email});
            if (userExists) {
                throw {CODE: 'EMAIL_ALREADY_EXISTS'};
            }
            // Generate verification token
            let verificationToken = await this.generateToken();

            // Construct user object
            let userDocument: UserDocument = {
                email: userObject.email.toLowerCase(),
                password: userObject.password,
                verifyUserToken: verificationToken as string
            };

            let user = await userAuthenticationRepo.signUp(userDocument);

            let activationLink = 'http://' + req.headers.host + UserConstant.USER_ACTIVATE_ACCOUNT_LINK + verificationToken + '/userId/' + user._id;
            // Draft email {template path, email template}
            let draft = await sendEmail.draftEmail(UserConstant.ACTIVATE_ACCOUNT_TEMPLATE, user.email, activationLink, UserConstant.ACTIVATE_ACCOUNT_SUBJECT)
            // Send email
            await sendEmail.sendEmail(res, draft.templatePath, draft.templateObject, user.email, draft.emailSubject);

            return {
                user: user,
                CODE: 'USER_CREATED'
            };

        } catch (error) {
            throw (error);
        }
    }

    public activateAccount(activateAccountObj: any): any {
        return new Promise<any>(async (resolve: any, reject: any): Promise<any> => {
            try {
                let isUserExists: any = await userAuthenticationRepo.findUser({'_id': Types.ObjectId(activateAccountObj.userId)});

                if (isUserExists) {
                    if (!isUserExists.verified) {
                        let validatedUser: any = await userAuthenticationRepo.findUser({
                            '_id': Types.ObjectId(activateAccountObj.userId),
                            'verifyUserToken': activateAccountObj.verificationToken
                        });

                        validatedUser.verified = true;
                        validatedUser.verifyUserToken = undefined;
                        validatedUser.updated = new Date();

                        let updatedUserObj: any = await userAuthenticationRepo.updateUser(validatedUser);
                        let sanitizedUserObj: any = await userAuthenticationRepo.sanitizeUserObject(updatedUserObj);

                        resolve({
                            user: sanitizedUserObj,
                            CODE: 'ACCOUNT_ACTIVATED_SUCCESSFULLY'
                        });

                    } else {
                        reject({
                            CODE: 'ACCOUNT_ALREADY_ACTIVATED',
                            HTTP_CODE: 409
                        });
                    }
                } else {
                    reject({
                        CODE: 'ACCOUNT_DOES_N0T_EXISTS',
                        HTTP_CODE: 404
                    });
                }
            } catch (error) {
                console.log('error', error);
                reject({
                    error: error,
                    CODE: 'SOMETHING_WENT_WRONG',
                    HTTP_CODE: 404
                });
            }
        });
    }

    public signIn(userObj: any): any {
        return new Promise<any>(async (resolve: any, reject: any): Promise<any> => {
            try {
                let userObject: UserDocument = await userAuthenticationRepo.findUser({'email': userObj.email});

                if (!userObject) throw {
                    CODE: 'INVALID_USERNAME_OR_PASSWORD',
                    HTTP_CODE: 401
                };

                await this._checkIfUserActive(userObject);
                await this._checkIfUserVerified(userObject);
                await userAuthenticationRepo.authenticateUser(userObject, userObj['password']);
                let token: string = await userAuthenticationRepo.generateJWT(userObject);

                resolve({
                    token: token ,
                    userId: userObject._id,
                    roles: userObject.roles,
                    email: userObject.email
                });
            } catch (error) {
                console.log('error', 'error' + JSON.stringify(error));

                reject(error);
            }
        });
    }


    public generateToken(): Promise<any> {
        return new Promise<any>((resolve: any, reject: any): any => {
            crypto.randomBytes(20, (err: any, buffer: any): any => {
                if (err) {
                    return reject(err);
                } else {
                    let token: any = buffer.toString('hex');
                    return resolve(token);
                }
            });
        })
    }


    private _checkIfUserActive(userObject: UserDocument): any {
        if (userObject.active) {
            return true;
        } else {
            throw {
                CODE: 'ACCOUNT_DEACTIVATED',
                HTTP_CODE: 403
            };
        }
    }

    private _checkIfUserVerified(userObject: UserDocument): any {
        if (userObject.verified) {
            return true;
        } else {
            throw {
                CODE: 'USER_VERIFICATION_PENDING',
                HTTP_CODE: 403
            };
        }
    }
}

export const userAuthenticationService: UserAuthenticationService = new UserAuthenticationService();
