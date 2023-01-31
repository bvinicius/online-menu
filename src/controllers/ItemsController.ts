import { ItemsService } from '../services/ItemsService';

export class ItemsController {
	constructor(private itemsService: ItemsService) {}

	get = async (req: any, res: any, next: any) => {
		try {
			res.json(await this.itemsService.getMultiple());
		} catch (err: any) {
			console.error(`Error while getting items`, err.message);
			next(err);
		}
	};

	getOne = async (req: any, res: any, next: any) => {
		try {
			const id = parseInt(req.params.id);
			if (!id) throw new Error(`The field 'id' must be provided. ${id}`);
			res.json(await this.itemsService.getOne(id));
		} catch (err: any) {
			console.error(`Error while getting item`, err.message);
			next(err);
		}
	};

	create = async (req: any, res: any, next: any) => {
		try {
			const item = req.body;
			const newId = await this.itemsService.create(item);
			res.json({ id: newId });
		} catch (err: any) {
			console.error(`Error while creating item`, err.message);
			next(err);
		}
	};
}
