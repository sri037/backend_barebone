import app from './Application';
import { ENV } from './environments/environment.default';

const port = ENV.port;

console.log('app.envObject', app.env);

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
})