import dotenv from 'dotenv';

export function config() {
	dotenv.config();

	return {
		host: process.env.MYSQL_HOST,
		port: parseInt(process.env.MYSQL_PORT!),
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	};
}
