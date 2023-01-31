import { Router, RequestHandler } from 'express';
import { ItemsController } from '../controllers/ItemsController';

export class ItemsRouter {
	readonly expressRouter = Router();

	constructor(private controller: ItemsController) {
		this.expressRouter.get('/', this.controller.get);

		this.expressRouter.get('/:id', this.controller.getOne);

		this.expressRouter.post('/', this.controller.create);
	}
}
