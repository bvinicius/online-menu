import { GoogleSpreadsheet } from 'google-spreadsheet';
import { IDatabaseRepository } from '../models/IDatabaseRepository';
import { config } from '../config/dbConfig';

export class GoogleSheetsRepository implements IDatabaseRepository {
	private dbConfig = config();
	private doc?: GoogleSpreadsheet;

	constructor() {}

	async createConnection(): Promise<void> {
		this.doc = new GoogleSpreadsheet(this.dbConfig.spreadSheetId);
		await this.authenticate();
		return this.doc.loadInfo();
	}

	async query<T>(query: string): Promise<T> {
		const [tableName, range] = query.split('!');

		const sheet = this.doc?.sheetsByTitle[tableName];
		await sheet?.loadCells(range);
		return sheet?.getRows() as T;
	}

	private authenticate() {
		return this.doc?.useServiceAccountAuth({
			client_email: this.dbConfig.clientEmail,
			private_key: this.dbConfig.privateKey,
		});
	}
}
