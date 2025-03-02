import { getMoviesOrTvDetails } from "../services/movies.service.js"
import { backdropBaserUrl, posterBaseUrl } from "../services/movies.service.js";

export const getTvDetails = async (id) => {
    const renderTvDetailsPage = async (id) => {
        let innerHTMLContent = '';

        let intro = `
            <div id='tv'>
            </div>
        `

        let detailsSection = `
            <div id='tv-details-section'>
            </div>
        `

        innerHTMLContent += intro + detailsSection;
        document.getElementById('content').innerHTML = innerHTMLContent;
        await updateTvDetails(id, 'tv');
    }

    await renderTvDetailsPage(id);
}

const updateTvDetails = async (id, mediaType) => {
    const details = await getMoviesOrTvDetails(id, mediaType);
    console.log(details);
    const tvIntro = document.querySelector('#tv');
    tvIntro.innerHTML = '';

    if (details.backdrop_path) {
        tvIntro.style.backgroundImage = `url('${backdropBaserUrl}${details.backdrop_path}')`;
    }

    const img = document.createElement('img');
    img.src = `${posterBaseUrl}${details.poster_path}`;
    img.alt = details.original_title || details.title || details.name || details.original_name;
    tvIntro.appendChild(img);

    const detailsSection = document.querySelector('#tv-details-section');
    detailsSection.innerHTML = '';

    const genreString = details.genres.map(genre => genre.name).join(', ');

    detailsSection.innerHTML = `
        <div class='tv-details-section-item'>
            <h4>Overview:</h4> <p>${details.overview}</p>
        </div>

        <div class='tv-details-section-item'>
            <h4>Title:</h4> <p>${details.original_title || details.title || details.name || details.original_name}</p>
        </div>

        <div class='tv-details-section-item'>
            <h4>Genre:</h4> <p>${genreString}</p>
        </div>

        <div class='tv-details-section-item'>
            <h4>Number of seaons:</h4> <p>${details.number_of_seasons} minutes</p>
        </div>

        <div class='tv-details-section-item'>
            <h4>First Air Date:</h4> <p>${details.first_air_date}</p>
        </div>

        <div class='tv-details-section-item'>
            <h4>Last Air Date:</h4> <p>${details.last_air_date}</p>
        </div>
    `;
}
