import { Router } from 'express';
import { USER_AUTHENTICATION_CONTROLLER } from './user.authentication.server.controller';

export const USER_ROUTE: Router = Router();

USER_ROUTE.post('/auth/signUp', USER_AUTHENTICATION_CONTROLLER.signUp);
// userRoute.post('/auth/signIn', UserAuthenticationController.signIn);
// userRoute.post('/auth/forgotPassword', UserAuthenticationController.forgotPassword);