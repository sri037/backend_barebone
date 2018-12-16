import { EnvironmentInterface } from './environment.interface';
import * as path from 'path';

export const ENV: EnvironmentInterface = {
    app: {
        title: 'Backend Barbecue',
        companyName: 'Me'
    },
    mode: 'development',
    port: 3000,
    mongodb_host: 'mongodb://localhost/accounts-dev',
    root_path: path.resolve(__dirname, '../../'),
    jwt_secret: 'b@ck€n$',
    mailer: {
        from: '',
        options: {
            service: '',
            auth: {
                user: '',
                pass: ''
            }
        }
    },
    destination_path: path.resolve(__dirname, '../../public/uploads'),
    public_folder_path: path.resolve(__dirname, '../../public')
};