
import {profileRepo} from './profile.server.repo';
import {Types} from "mongoose";
import * as _ from 'lodash';

export class ProfileService {

    constructor() {

    }

    public async create(profileObject: any): Promise<any> {
        try {
            let profileDocument: any = await profileRepo.create(profileObject);
            return profileDocument;
        } catch (e) {
            throw e;
        }
    }

    public async update(id: any, profileObject: any): Promise<any> {
        try {
            let profile: any = await profileRepo.find({'_id': Types.ObjectId(id)});
            let newObj = _.assignIn(profile[0], profileObject);

            let updatedObj: any = await profileRepo.update(newObj);
            return updatedObj;
        } catch (e) {
            throw e;
        }
    }

    public async getById(id: any): Promise<any> {
        try {
            let profileObj: any = await profileRepo.find({'_id': Types.ObjectId(id)});

            return profileObj;
        } catch (e) {
            throw e;
        }
    }


    public async get(): Promise<any> {
        try {
            let profileList: any = await profileRepo.find({});

            return profileList;
        } catch (e) {
            throw e;
        }
    }

}

export const profileService: ProfileService = new ProfileService();