
import {Router} from 'express';
import {profileController} from './profile.server.controller';
import {jwtAuthenticationMiddleware} from '../utils/middleware/jwt-authentication';

export const profileRoute: Router = Router();

// By id
profileRoute.get('/:id', profileController.getById);
// All
profileRoute.get('/', profileController.get);
// Update
profileRoute.put('/:id', profileController.update);
// Create
profileRoute.post('/', profileController.create);
