import express from 'express';
import { ItemsController } from './src/controllers/ItemsController';
import { MySqlRepository } from './src/repositories/MySqlRepository';
import { ItemsRouter } from './src/routes/itemsRouter';
import { ItemsService } from './src/services/ItemsService';
import bodyParser from 'body-parser';

const app = express();
const port = 9090;

const mySqlRepository = new MySqlRepository();
const itemsService = new ItemsService(mySqlRepository);
const itemsController = new ItemsController(itemsService);
const itemsRouter = new ItemsRouter(itemsController);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/items', itemsRouter.expressRouter);

(async () => {
	await mySqlRepository.createConnection();

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
})();
