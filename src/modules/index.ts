import { Router } from 'express';
import { USER_ROUTE } from './user/authentication/user.authentication.server.routes'
import {profileRoute} from "./profile/profile.server.routes";

export const api: Router = Router();

api.get('/users', (req: any, res: any) => {
    res.json({
        message: 'users router'
    });
});

api.use('/user', USER_ROUTE);
api.use('/profile', profileRoute);
