import express from 'express';
import { ItemsController } from './src/controllers/ItemsController';
import { GoogleSheetsRepository } from './src/repositories/GoogleSheetsRepository';
import { ItemsRouter } from './src/routes/itemsRouter';
import { ItemsService } from './src/services/ItemsService';

const app = express();
const port = 9090;

const googleSheetsRepository = new GoogleSheetsRepository();
const itemsService = new ItemsService(googleSheetsRepository);
const itemsController = new ItemsController(itemsService);

const itemsRouter = new ItemsRouter(itemsController);

app.use('/items', itemsRouter.expressRouter);

(async () => {
	await googleSheetsRepository.createConnection();

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
})();
