import { getMoviesOrTvDetails } from "../services/movies.service.js"
import { backdropBaserUrl, posterBaseUrl } from "../services/movies.service.js";

export const getMovieDetails = async (id) => {
    const renderMovieDetailsPage = async (id) => {
        let innerHTMLContent = '';

        let intro = `
            <div id='movie'>
            </div>
        `

        let detailsSection = `
            <div id='movie-details-section'>
            </div>
        `

        innerHTMLContent += intro + detailsSection;
        document.getElementById('content').innerHTML = innerHTMLContent;
        await updateMovieDetails(id, 'movie');
    }

    await renderMovieDetailsPage(id);
}

const updateMovieDetails = async (id, mediaType) => {
    const details = await getMoviesOrTvDetails(id, mediaType);
    const movieIntro = document.querySelector('#movie');
    movieIntro.innerHTML = '';

    if (details.backdrop_path) {
        movieIntro.style.backgroundImage = `url('${backdropBaserUrl}${details.backdrop_path}')`;
    }

    const img = document.createElement('img');
    img.src = `${posterBaseUrl}${details.poster_path}`;
    img.alt = details.original_title || details.title || details.name || details.original_name;
    movieIntro.appendChild(img);

    const detailsSection = document.querySelector('#movie-details-section');
    detailsSection.innerHTML = '';

    const genreString = details.genres.map(genre => genre.name).join(', ');

    detailsSection.innerHTML = `
        <div class='movie-details-section-item'>
            <h4>Overview:</h4> <p>${details.overview}</p>
        </div>

        <div class='movie-details-section-item'>
            <h4>Title:</h4> <p>${details.original_title || details.title || details.name || details.original_name}</p>
        </div>

        <div class='movie-details-section-item'>
            <h4>Genre:</h4> <p>${genreString}</p>
        </div>

        <div class='movie-details-section-item'>
            <h4>Runtime:</h4> <p>${details.runtime} minutes</p>
        </div>

        <div class='movie-details-section-item'>
            <h4>Release Date:</h4> <p>${details.release_date}</p>
        </div>
    `;
}
