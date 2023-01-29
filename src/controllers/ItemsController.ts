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
}
