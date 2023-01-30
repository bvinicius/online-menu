import { IDatabaseRepository } from '../models/IDatabaseRepository';
import { Connection, createConnection } from 'mysql';
import { config } from '../config/mySqlConfig';

export class MySqlRepository implements IDatabaseRepository {
	private dbConfig = config();
	private connection?: Connection;

	createConnection(): Promise<void> {
		this.connection = createConnection({
			host: this.dbConfig.host,
			port: this.dbConfig.port,
			user: this.dbConfig.user,
			password: this.dbConfig.password,
			database: this.dbConfig.database,
		});

		return Promise.resolve();
	}

	query<T>(query: string): Promise<T> {
		return new Promise((resolve) => {
			this.connection?.query(
				`SELECT * FROM items`,
				(error, results, fields) => {
					if (error) {
						throw error;
					}
					console.log(results);
					resolve(results);
				}
			);
		});
	}
}
