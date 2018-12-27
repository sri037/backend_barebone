import { ENV } from "../../environments/environment.default";

export class UserConstant {
    // Email Template
    public static ACTIVATE_ACCOUNT_TEMPLATE : string = './src/modules/user/authentication/templates/user-activation-email';

    //
    public static USER_ACTIVATE_ACCOUNT_LINK: string = '/api/v1/user/auth/activateAccount/';

    // Static text
    public static ACTIVATE_ACCOUNT_SUBJECT: string = `Welcome`; // to ${ENV.app.title}`;

}