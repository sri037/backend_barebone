import { EnvironmentInterface } from './environment.interface';
import * as path from 'path';

export const ENV: EnvironmentInterface = {
    app: {
        title: 'Backend Barbecue',
        companyName: 'Me'
    },
    mode: 'development',
    port: 3000,
    mongodb_host: 'mongodb://localhost/backend-barbecue',
    jwt_secret: 'b@ck€n$',
    root_path: path.resolve(__dirname, '../../'),
    destination_path: path.resolve(__dirname, '../../public/uploads'),
    public_folder_path: path.resolve(__dirname, '../../public'),
    mailer: {
        from: '',
        options: {
            service: '',
            auth: {
                user: '',
                pass: ''
            }
        }
    }
};