import express from 'express';
import itemsRouter from './src/routes/itemsRouter';

const app = express();
const port = 9090;

app.use('/items', itemsRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
