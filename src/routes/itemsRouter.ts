import { Router } from 'express';
import { ItemsController } from '../controllers/ItemsController';

export class ItemsRouter {
	readonly expressRouter = Router();

	constructor(private controller: ItemsController) {
		this.expressRouter.get('/', this.controller.get);
	}
}
