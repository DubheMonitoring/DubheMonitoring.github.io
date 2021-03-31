// const express = require('express');
// const Datastore = require('nedb');
// const fetch = require('node-fetch');

// const app = express();
// app.listen(5500, () => console.log('listening at 5500'));
// app.use(express.static('index.html'));
// app.use(express.json({ limit: '1mb' }));

// const database = new Datastore('database.db');
// database.loadDatabase();

// app.post('/api', (request, response) => {
// 	console.log('I got a request!');
// 	const data = request.body;
// 	const timestamp = Date.now();
// 	data.timestamp = timestamp;
// 	database.insert(data);
// 	response.json({
// 		status: 'success',
// 		timestamp: timestamp,
// 		latitude: data.lat,
// 		longitude: data.lon,
// 	});
// });

const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
