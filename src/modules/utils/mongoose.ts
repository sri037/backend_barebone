import { connect, connection } from 'mongoose';
import { ENV } from '../../environments/environment.default';

// connect to mongo db
const mongoUri: string = ENV.mongodb_host;
export function connectToDb(): Promise<any> {
    console.log('connecting..',mongoUri);
    console.log('connecting..',process.env.BUILD_ENV);

    return connect(mongoUri, { useNewUrlParser: true, server: { socketOptions: { keepAlive: 1 } } })
        .then((res: any) => {
            console.log('info', `Connected to MongoDB`);
        });
}

connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${mongoUri}`);
});
