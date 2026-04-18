window.onload = function () {
	const xhr = new XMLHttpRequest();
	xhr.onload = function () {
		const bodyElement = document.querySelector("body");
		if (xhr.status == 200) {
			const movies = JSON.parse(xhr.responseText);
			const fragment = document.createDocumentFragment();
			for (const movieId of movies) {
				/* Task 1.3. Add your code from exercise 1 here 
				and include a non-functional 'Edit' button
				to pass this test */
				const movie = Object.values(movieId)[0];
				const movieArticle = document.createElement('article');
				movieArticle.id = movie.imdbID;

				const movieOverview = document.createElement('div');
				movieOverview.classList.add('movie-overview');

				// extracting poster img
				const moviePoster = document.createElement('img');
				moviePoster.src = movie.Poster;

				// extracting movie title
				const movieTitle = document.createElement('h1');
				movieTitle.textContent = movie.Title;

				// extracting movie info (Runtime, Released)
				const movieInfo = document.createElement('p');
				let runtimeMinutes = movie.Runtime;
				let runtimeHours = 0;
				while (runtimeMinutes >= 60) {
					++runtimeHours;
					runtimeMinutes -= 60;
				}
				const movieReleased = movie.Released.split('T')[0].split('-').reverse().join('/');
				movieInfo.textContent = `Runtime ${runtimeHours}h ${runtimeMinutes}m•Released on  ${movieReleased}`;

				// extracting Genres
				const movieGenres = document.createElement('p');
				movie.Genres.forEach(genre => {
					const genreSpan = document.createElement('span');
					genreSpan.classList.add('genre');
					genreSpan.textContent = genre;
					movieGenres.append(genreSpan);
				});

				// extracting Plot
				const moviePlot = document.createElement('p');
				moviePlot.textContent = movie.Plot;

				// extracting ratings
				const ratingsContainer = document.createElement('div');
				ratingsContainer.classList.add('ratings-box');

				const imdbScore = document.createElement('span');
				imdbScore.textContent = `IMDb: ${movie.imdbRating}/10 ⭐️`;

				const metaScore = document.createElement('span');
				metaScore.textContent = `Metascore: ${movie.Metascore} 🍅`;
				
				ratingsContainer.append(imdbScore, " | ", metaScore);
				movieOverview.append(moviePoster, movieTitle, movieInfo, movieGenres, moviePlot, ratingsContainer);

				// extracting cast and crew
				const castAndCrew = document.createElement('div');
				castAndCrew.classList.add('cast-and-crew');
				
				// extracting Directors
				const directorTitle = document.createElement('h2');
				directorTitle.textContent = "Director";
				const directorArray = movie.Directors;
				const directorList = document.createElement('ul');
				directorArray.forEach(director => {
					const directorElement = document.createElement('li');
					directorElement.textContent = director;
					directorList.append(directorElement);
				});
				castAndCrew.append(directorTitle, directorList);

				// extracting Writers
				const writerTitle = document.createElement('h2');
				writerTitle.textContent = "Writers";
				const writerArray = movie.Writers;
				const writerList = document.createElement('ul');
				writerArray.forEach(writer => {
					const writerElement = document.createElement('li');
					writerElement.textContent = writer;
					writerList.append(writerElement);
				});
				castAndCrew.append(writerTitle, writerList);

				// extracting Actors
				const actorTitle = document.createElement('h2');
				actorTitle.textContent = "Actors";
				const actorArray = movie.Actors;
				const actorList = document.createElement('ul');
				actorArray.forEach(actor => {
					const actorElement = document.createElement('li');
					actorElement.textContent = actor;
					actorList.append(actorElement);
				});
				castAndCrew.append(actorTitle, actorList);

				const editButton = document.createElement("button");
				editButton.textContent = "Edit";
				editButton.classList.add('edit-btn');

				editButton.onclick = function() {
				// Yeet the user to the edit page with the ID in the URL!
					location.href = 'edit.html?imdbID=' + movie.imdbID;
				};

				movieArticle.append(movieOverview, castAndCrew, editButton);
				fragment.append(movieArticle);
			}
			bodyElement.append(fragment);
		} 
		else {
			bodyElement.append(
				"Daten konnten nicht geladen werden, Status " +
				xhr.status +
				" - " +
				xhr.statusText
			);
		}
	};
	xhr.open("GET", "/movies");
	xhr.send();
};
