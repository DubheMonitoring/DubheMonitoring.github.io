// const express = require('express');
// const Datastore = require('nedb');
// const fetch = require('node-fetch');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
// 	console.log(`Starting server at ${port}`);
// });
// app.use(express.static('public'));
// app.use(express.json({ limit: '1mb' }));

// const database = new Datastore('database.db');
// database.loadDatabase();

// app.get('/support.html', (request, response) => {
// 	database.find({}, (err, data) => {
// 		if (err) {
// 			response.end();
// 			return;
// 		}
// 		response.json(data);
// 	});
// });

// app.post('/support.html', (request, response) => {
// 	const data = request.body;
// 	const timestamp = Date.now();
// 	data.timestamp = timestamp;
// 	database.insert(data);
// 	response.json(data);
// });

// app.get('/weather/:latlon', async (request, response) => {
// 	console.log(request.params);
// 	const latlon = request.params.latlon.split(',');
// 	console.log(latlon);
// 	const lat = latlon[0];
// 	const lon = latlon[1];
// 	console.log(lat, lon);
// 	const api_key = process.env.API_KEY;
// 	const weather_url = `https://api.climacell.co/v3/weather/realtime?lat=${latitude}&lon=${longitude}&fields%5B%5D=temp&fields%5B%5D=weather_code&fields%5B%5D=feels_like&fields%5B%5D=precipitation_type&apikey=${api_key}`;
// 	const weather_response = await fetch(weather_url);
// 	const weather_data = await weather_response.json();

// 	const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
// 	const aq_response = await fetch(aq_url);
// 	const aq_data = await aq_response.json();

// 	const data = {
// 		weather: weather_data,
// 		air_quality: aq_data,
// 	};
// 	response.json(data);
// });

// const express = require('express');
// const app = express();
// app.listen(5500, () => console.log('listening at 5500'));
// app.use(express.static('support.html'));

const express = require('express');
const app = express();
const port = 5500;

// app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
