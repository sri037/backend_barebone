import { Router } from 'express';
import { userRoute } from './user/authentication/user.authentication.server.routes'
import {profileRoute} from "./profile/profile.server.routes";

export const api: Router = Router();

api.get('/users', (req: any, res: any) => {
    res.json({
        message: 'users router'
    });
});

api.use('/user', userRoute);
api.use('/profile', profileRoute);
