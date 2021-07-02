
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import authMiddleware from './middlewares/authMiddleware';

import VendedorController from './controllers/VendedorController';
import ProdutoController from './controllers/ProdutoController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';

import AllProductsController from './controllers/AllProductsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/auth', SessionController.authenticate);

routes.get('/products', AllProductsController.index);

routes.get('/profile', ProfileController.index);

routes.get('/vendedor', authMiddleware, VendedorController.index);
routes.get('/vendedor/:id', VendedorController.show);
routes.post('/vendedor', VendedorController.create);

routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.delete('/produtos/:id', ProdutoController.delete);
routes.post('/update/:id', upload.array('images'), ProdutoController.update);
routes.post('/produtos', upload.array('images'), ProdutoController.create);

export default routes;