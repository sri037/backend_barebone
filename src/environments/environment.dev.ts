import { EnvironmentInterface } from './environment.interface';
import * as env from './environment.default';

export const ENV: EnvironmentInterface = Object.assign(env.ENV, {
    port: 4030
});
