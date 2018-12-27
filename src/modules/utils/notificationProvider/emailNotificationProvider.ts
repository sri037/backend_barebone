import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { ENV } from '../../../environments/environment.default';
// import { logger } from '@util/logger';

const smtpTransport: any = nodemailer.createTransport(ENV.mailer.options);

class EmailNotificationProvider {
    /**
     * @function Send the email notification
     * @param res - HTTP response object
     * @param templatePath - Path of the email template
     * @param templateObject - Contains details like username, company name, activation link etc that the template requires
     * @param sendTo - email address of the recipient
     * @param subject - subject of the email to be sent
     * @returns resolve object with true if success else reject object with error code
     */
	public sendEmail(res: any, templatePath: string, templateObject: any, sendTo: string, subject: string): Promise<any> {
		// logger.log('info', 'inside notification provider' + JSON.stringify(ENV.mailer.options));

		return new Promise(async (resolve: any, reject: any): Promise<any> => {
			try {
				let templateContent: any = await this._createTemplate(res, templatePath, templateObject);
				let response: any = await this._sendEmail(sendTo, subject, templateContent);

				resolve(response);
			} catch (e) {
				// logger.log('error', JSON.stringify(e));
				reject(e);
			}
		});
	}

    /**
     * @function Creating the email template with all required data
     * @param res - HTTP response object
     * @param templatePath - Path of the email template
     * @param templateObject - Contains details like username, company name, activation link etc that the template requires
     * @return resolve object with email html template else reject object with error code
     */
	private _createTemplate(res: any, templatePath: string, templateObject: any): Promise<any> {
		return new Promise((resolve: any, reject: any): any => {
			res.render(path.resolve(templatePath), {
				templateObject: templateObject
			}, (err: any, emailHTML: any) => {
				if (err) {
					// logger.log('error', 'Create template err ' + err);

					return reject({
						code: 'ERROR_WHILE_SENDING_MAIL'
					});
				} else {
					return resolve(emailHTML);
				}
			});
		});
	}

    /**
     * @function Send email to user
     * @param sendTo - email address of recipient
     * @param subject - subject of the email to be sent
     * @param emailContent - email content
     * @return resolve object with true if success else reject object with error code
     */
	private _sendEmail(sendTo: string, subject: string, emailContent: any): Promise<any> {
		return new Promise((resolve: any, reject: any): any => {
			// mail variable
			let mailOptions: any = {
				to: sendTo,
				from: ENV.mailer.from,
				subject: subject,
				html: emailContent
			};

			// Sending mail
			smtpTransport.sendMail(mailOptions, (err: any) => {
				if (err) {
					// logger.log('error', 'Failed to send mail ' + err);

					return reject({
						code: 'ERROR_WHILE_SENDING_MAIL'
					});
				} else {
					return resolve(true);
				}
			});
		});
	}
}

export const EMAIL_NOTIFICATION_PROVIDER: EmailNotificationProvider = new EmailNotificationProvider();
