import app from './Application';
import { ENV } from './environments/environment.default';

const port = ENV.port;

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`server is listening on ${port} in ${process.env.BUILD_ENV} environment`)
})