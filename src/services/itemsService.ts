import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { IDatabaseRepository } from '../models/IDatabaseRepository';
import { ItemModel } from '../models/items/ItemModel';
import { RepositoryItemModel } from '../models/items/RepositoryItem';
import { v4 as uuid } from 'uuid';
import { RestCreateItem } from '../models/items/RestCreateItem';

type ItemRow = GoogleSpreadsheetRow & RepositoryItemModel;

export class ItemsService {
	constructor(private itemsRepository: IDatabaseRepository) {}

	async getMultiple(): Promise<ItemModel[]> {
		const items = await this.itemsRepository.query<ItemRow[]>(`
				SELECT * FROM items LIMIT 10;
			`);

		return items.map((item) => ({
			id: item.id,
			name: item.name,
			category: item.category,
			price: item.price,
		}));
	}

	async getOne(id: number): Promise<ItemModel> {
		const [item] = await this.itemsRepository.query<ItemRow[]>(`
				SELECT * FROM items WHERE id = ${id};
			`);

		return {
			id: item.id,
			name: item.name,
			category: item.category,
			price: item.price,
		};
	}

	async create(item: RestCreateItem): Promise<string> {
		const id = item.id || uuid();
		await this.itemsRepository.query(`
				INSERT INTO items (id, name, price) VALUES ('${id}', '${item.name}', ${item.price});
			`);

		return id;
	}
}
