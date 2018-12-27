import {EMAIL_NOTIFICATION_PROVIDER} from "./notificationProvider/emailNotificationProvider";
import * as express from 'express';
import {ENV} from "../../environments/environment.default";

export class SendEmail {

    public sendEmail(res: express.Response, templatePath: string, templateObject: any, emailId: string, mailSubject: string): Promise<any> {
        return new Promise<any>(async (resolve: any, reject: any): Promise<any> => {
            try {
                let response: any = await EMAIL_NOTIFICATION_PROVIDER.sendEmail(res, templatePath, templateObject, emailId, mailSubject);
                if (response) {
                    resolve(true);
                } else throw 'ERROR_WHILE_SENDING_MAIL'; // throw is used execute local catch block
            } catch (error) {
                return reject({
                    err: {
                        CODE: error['code'],
                    }
                });
            }
        });
    }

    public draftEmail(path: string, emailId: string, redirectionLink: string, subject: string): Promise<any> {
        return new Promise<any>(resolve => {
            let templatePath: any = path;
            let templateObject: any = {
                email: emailId,
                link: redirectionLink,
                appName: ENV.app.title,
                companyName: ENV.app.companyName
            };
            let emailSubject: string = subject;

            return resolve({
                templatePath: templatePath,
                templateObject: templateObject,
                emailSubject: emailSubject
            });
        });
    }

}

export const SEND_EMAIL: SendEmail = new SendEmail();