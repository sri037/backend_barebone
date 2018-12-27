
import {Document} from "mongoose";
import {profileModel} from "./profile.server.model";
import {error} from "util";

export class ProfileRepo {
    constructor() {

    }

    public create(profileObject: any): Promise<any> {
        return new Promise<any>( (resolve: any, reject: any): any => {
            const profile: Document = new profileModel(profileObject);
            profile.save(async (err: any, profileDocument: any) => {
                if (err) {
                    return reject(err);
                } else {
                    // sanitize user Object
                    return resolve(profileDocument);
                }
            });
        });
    }

    public update(profileObject: any): Promise<any> {
        return new Promise<any>((resolve: any, reject: any): any => {
            profileObject.save((err: any, profileDocument: any) => {
                if (err) {

                    return reject(error);
                } else {
                    return resolve(profileDocument);
                }
            });
        });
    }

    public async find(query: any): Promise<any> {
        try {
            let user = profileModel.find(query);

            return user;
        } catch (e) {

            return e;
        }
    }
}

export const profileRepo: ProfileRepo = new ProfileRepo();
    