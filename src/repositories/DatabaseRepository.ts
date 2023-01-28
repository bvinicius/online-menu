import { GoogleSpreadsheet } from 'google-spreadsheet';
import { IDatabaseRepository } from '../models/IDatabaseRepository';
import { config } from '../config/dbConfig';

export class DatabaseRepository implements IDatabaseRepository {
	private dbConfig = config();
	private doc: GoogleSpreadsheet;

	constructor() {}

	async createConnection(): Promise<void> {
		const doc = new GoogleSpreadsheet(this.dbConfig.spreadSheetId);
		await this.authenticate(doc);

		return doc.loadInfo();
	}

	async query<T>(query: string): Promise<T> {
		const tableName = query.split('!')[0];

		const sheet = this.doc.sheetsByTitle[tableName];
		await sheet.loadCells('A:D');
		return sheet.getRows() as T;
	}

	private authenticate(doc: GoogleSpreadsheet) {
		return doc.useServiceAccountAuth({
			client_email: this.dbConfig.clientEmail,
			private_key: this.dbConfig.privateKey,
		});
	}
}
