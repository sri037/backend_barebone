
import { Schema, model, Model, Document } from 'mongoose';
export class ProfileModel extends Schema {

    constructor() {

        const profile: any = super({
            name: {type: String},
            status: {type:Boolean},
            created: { type: Date, default: (): Date => new Date() },
            updated: { type: Date }
            });
        }
    }

let profile: ProfileModel = new ProfileModel();
export const profileModel: Model<Document> = model('profiles', profile);