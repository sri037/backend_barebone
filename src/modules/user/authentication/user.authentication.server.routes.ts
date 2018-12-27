import {Router} from 'express';
import {userAuthenticationController} from './user.authentication.server.controller';
import {jwtAuthenticationMiddleware} from '../../utils/middleware/jwt-authentication'

export const USER_ROUTE: Router = Router();

USER_ROUTE.post('/auth/signUp', userAuthenticationController.signUp);
USER_ROUTE.get('/auth/activateAccount/:token/userId/:userId', userAuthenticationController.activateAccount);

USER_ROUTE.post('/auth/signIn', userAuthenticationController.signIn);

USER_ROUTE.get('/auth/testJWT', jwtAuthenticationMiddleware.authenticateUser(),
    (req: any, res: any): any => {
        let userObj = req.user;
        res.json({data: {user: userObj}});
    });
// userRoute.post('/auth/forgotPassword', UserAuthenticationController.forgotPassword);