import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { IDatabaseRepository } from '../models/IDatabaseRepository';
import { ItemModel } from '../models/items/ItemModel';
import { RepositoryItem } from '../models/items/RepositoryItem';

type ItemRow = GoogleSpreadsheetRow & RepositoryItem;

export class ItemsService {
	constructor(private itemsRepository: IDatabaseRepository) {
		this.itemsRepository.createConnection();
	}

	async getMultiple(): Promise<ItemModel[]> {
		const items = await this.itemsRepository.query<ItemRow[]>('items!A:D');
		return items.map((item) => ({
			id: item.id,
			name: item.name,
			category: item.category,
			price: item.price,
		}));
	}
}
