export interface IDatabaseRepository {
	createConnection(): Promise<void>;
	query<T>(query: string): Promise<T>;
}
