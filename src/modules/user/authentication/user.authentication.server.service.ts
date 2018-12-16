import {UserDocument} from "../user.type";
import {USER_AUTHENTICATION_REPO} from "./user.authentication.server.repo";

export class UserAuthenticationService {

    constructor() {

    }

    public async signUp(userObject: UserDocument, req: object, res: object): Promise<any> {
        try {
            let userExists = await USER_AUTHENTICATION_REPO.findUser({'email': userObject.email});
            if (userExists) {
                throw {CODE: 'EMAIL_ALREADY_EXISTS'};
            }

            let userDocument: UserDocument = {
                email: userObject.email.toLowerCase(),
                password: userObject.password
            };
            let user = USER_AUTHENTICATION_REPO.signUp(userDocument);

            return user;

        } catch (error) {
            throw (error);
        }
    }
}

export const USER_AUTHENTICATION_SERVICE: UserAuthenticationService = new UserAuthenticationService();
