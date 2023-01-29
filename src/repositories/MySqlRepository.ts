import { IDatabaseRepository } from '../models/IDatabaseRepository';
import { Connection, createConnection } from 'mysql';

export class MySqlRepository implements IDatabaseRepository {
	private connection?: Connection;

	createConnection(): Promise<void> {
		this.connection = createConnection({
			host: process.env.MYSQL_HOST,
			port: parseInt(process.env.MYSQL_PORT!),
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
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
