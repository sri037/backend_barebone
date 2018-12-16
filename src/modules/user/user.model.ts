import { Schema, model, Model, Document } from 'mongoose';
import * as validator from 'validator';
import * as crypto from 'crypto';

import {UseRoles} from "./user.type";


export class UserModel extends Schema {

    constructor() {

        let validateEmailId: any = (email: string): any => {
            let me: any = this;
            return (me.updated === undefined && validator.isEmail(email, {require_tld: false}));
        };

        let validateEMail: any = [
            {validator: validateEmailId, msg: 'INVALID_EMAIL_ID'}
        ];

        const user: any = super({
            email: {type: String, unique: true, validate: validateEMail, required: true},
            password: { type: String},
            verifyUserToken: { type: String },
            token: { type: String },
            roles: { type: UseRoles, default: UseRoles.user },
            active: { type: Boolean, default: true },
            verified: { type: Boolean, default: false },
            verificationToken: { type: String },
            created: { type: Date, default: (): Date => new Date() },
            updated: { type: Date }
        });


        this.pre('save', this.encryptPassword);
        user.method('authenticate', this.authenticate);
        user.method('hashPassword', this.hashPassword);
    }

    // Encrypt password before saving
    encryptPassword(next: any): void {
        let me: any = this;
        if (me.password && me.isModified('password')) {
            me.salt = crypto.randomBytes(16)
                .toString('base64');
            me.password = crypto.pbkdf2Sync(me.password, new Buffer(me.salt, 'base64'), 10000, 64, 'SHA1')
                .toString('base64');
        }
        next();
    }

    // Encrypt Plain password
    public hashPassword(password: any): any {
        let self: any = this;
        if (self.salt && password) {
            return crypto.pbkdf2Sync(password, new Buffer(self.salt, 'base64'), 10000, 64, 'SHA1')
                .toString('base64');
        } else {
            return password;
        }
    }

    // Check if saved password & entered password are same
    public authenticate(password: any): boolean {
        let self: any = this;

        return self.password === self.hashPassword(password);
    }

}

let user: UserModel = new UserModel();
export const USER_MODEL: Model<Document> = model('users', user);