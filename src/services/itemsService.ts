export class ItemsService {
	async getMultiple(page: number) {
		const items = await this.itemsRepository.query<Item[]>('Items!A:D');
		return items;
	}
}
