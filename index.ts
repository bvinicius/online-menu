import express from 'express';

const app = express();
const port = 9090;

app.get('/', (_, res) => {
	res.send('API is running.');
});

app.get('/products', (_, res) => {
	res.send({ message: 'Hello Tester!' });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
