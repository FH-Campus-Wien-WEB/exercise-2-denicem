const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();
let movies = [];

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));


// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
	/* Task 1.2. Remove the line below and return the movies from the model as an array */
	console.log("ENDPOINT '/movies' called.");
	res.json(movies);
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
	/* Task 2.1. Remove the line below and add the functionality here */
	const id = req.params.imdbID;
	console.log(`ENDPOINT '/movies/:${id}' called.`);

	const movie = movies.find((movieId) => {
		const movie = Object.values(movieId)[0];
		return movie.imdbID === id});
	if (movie != undefined) {
		return res.json(Object.values(movie)[0]);
	}
	res.sendStatus(404);
})

/* Task 3.1 and 3.2.
	- Add a new PUT endpoint
	- Check whether the movie sent by the client already exists 
	 and continue as described in the assignment */

//	initializing data and server

movieModel.initMovies().then(data => {
	movies = data;
	console.log(`Successfully loaded ${movies.length} movies.`);
	app.listen(3000, () => {
		console.log("Server now listening on http://localhost:3000/");
	});
});