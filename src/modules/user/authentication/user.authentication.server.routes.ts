import {Router} from 'express';
import {userAuthenticationController} from './user.authentication.server.controller';
import {jwtAuthenticationMiddleware} from '../../utils/middleware/jwt-authentication'

export const userRoute: Router = Router();

userRoute.post('/auth/signUp', userAuthenticationController.signUp);
userRoute.get('/auth/activateAccount/:token/userId/:userId', userAuthenticationController.activateAccount);

userRoute.post('/auth/signIn', userAuthenticationController.signIn);

userRoute.get('/auth/testJWT', jwtAuthenticationMiddleware.authenticateUser(),
    (req: any, res: any): any => {
        let userObj = req.user;
        res.json({data: {user: userObj}});
    });
// userRoute.post('/auth/forgotPassword', UserAuthenticationController.forgotPassword);