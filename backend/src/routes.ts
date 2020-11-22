import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.patch('/orphanages/:id', ensureAuthenticated, upload.array('images'), OrphanagesController.edit);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', ensureAuthenticated, upload.array('images'), OrphanagesController.create);
routes.delete('/orphanages/:id', ensureAuthenticated, OrphanagesController.delete);

routes.post('/sessions', SessionsController.create);

routes.post('/users', UsersController.create);
routes.get('/users', ensureAuthenticated, UsersController.list);
routes.get('/users/:id', ensureAuthenticated, UsersController.show);


export default routes;