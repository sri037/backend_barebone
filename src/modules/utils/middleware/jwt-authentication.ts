import { Strategy, ExtractJwt } from 'passport-jwt';
import * as passport from 'passport';
import { ENV } from "../../../environments/environment.default";
import {userAuthenticationRepo} from "../../user/authentication/user.authentication.server.repo";
import {Types} from "mongoose";
import {UserDocument} from "../../user/user.type";

export class JwtAuthenticationMiddleware {

    constructor() {
        this._configureJWTStrategy();
    }

    private _configureJWTStrategy(): void {
        const opt: any = {};
        opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opt.secretOrKey = ENV.jwt_secret;

        passport.use(new Strategy(opt, (jwt_payload: any, done: any): any => {
            let jwtPayload : { userId, role, iat } = jwt_payload;

            userAuthenticationRepo.findUser({'_id': Types.ObjectId(jwtPayload.userId)})
                .then((userObj: UserDocument) => {
                    if (userObj === null) throw 'USER_DOES_NOT_EXISTS';

                    done(false, userObj);
                })
                .catch((error: any) => {
                    console.log('error', error);
                    done(true, false);
                });
        }));
    }

    public authenticateUser(): any {
        return (req: any, res: any, next: any): void => {
            passport.authenticate('jwt', (err: any, user: any, info: any) => {
                if (err || info instanceof Error) {
                    res.status(403)
                        .json({
                            error: {
                                CODE: 'INVALID_TOKEN'
                            }
                        });

                    return;
                }
                req.user = user;
                req.info = info;
                next();
            })(req, res, next);
        };
    }
}

export const jwtAuthenticationMiddleware: JwtAuthenticationMiddleware = new JwtAuthenticationMiddleware();