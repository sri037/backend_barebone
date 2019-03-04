import { EnvironmentInterface } from './environment.interface';
import * as env from './environment.default';

export const ENV: EnvironmentInterface = Object.assign(env.ENV, {
    port: 3000,
});

export const MONGO_HOST: String = 'mongodb://localhost/backend-barbecue';
