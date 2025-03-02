import { getTrendingTop20, posterBaseUrl } from "../services/movies.service.js";
import { navigateTo } from "../routes/routes.js";

export const getHomePage = () => {
    const renderHomePage = async () => {
        let innerHTMLContent = '';

        let intro = `
        <div id='intro'>
            <div>
                <h2>Welcome.</h2>
                <h3>Millions of movies and TV shows to discover. Explore now.</h3>
            </div>
        </div>`;

        let headingAndTrack = '';
        if (window.innerWidth > 500) {
            headingAndTrack += `
                <div class="heading">
                    <h2>Trending</h2>
                    <div id="trending" class="pillbox-background-container">
                        <div class="pillbox-background active" data-frequency='day'>Today</div>
                        <div class="pillbox-background" data-frequency='week'>This Week</div>
                    </div>
                </div>
                <div class="trending-carousel-track"></div>

                <div class="heading">
                    <h2>What's Popular</h2>
                    <div id="popular" class="pillbox-background-container">
                        <div class="pillbox-background active" data-airing-type='on_the_air'>On The Air</div>
                        <div class="pillbox-background" data-airing-type='popular'>Popular</div>
                        <div class="pillbox-background" data-airing-type='top_rated'>Top Rated</div>
                    </div>
                </div>
                <div class="popular-carousel-track"></div>
            `;
        } else {
            headingAndTrack += `
                <div class="heading">
                    <h2>Trending</h2>
                    <select id="trending">
                        <option value="day" selected>Today</option>
                        <option value="week">This week</option>
                    </select>
                </div>
                <div class="trending-carousel-track"></div>

                <div class="heading">
                    <h2>What's Popular</h2>
                    <select id="popular">
                        <option value="on_the_air" selected>On The Air</option>
                        <option value="popular">Popular</option>
                        <option value="top_rated">Top Rated</option>
                    </select>
                </div>
                <div class="popular-carousel-track"></div>
            `;
        }

        innerHTMLContent += intro + headingAndTrack;
        document.getElementById('content').innerHTML = innerHTMLContent;

        if (window.innerWidth > 500) {
            const trendingPills = document.querySelectorAll('#trending .pillbox-background');
            trendingPills.forEach(pill => {
                pill.addEventListener('click', async function () {
                    trendingPills.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    await updateTrendingTop20MovieContent('trending', this.getAttribute('data-frequency'));
                });
            });

            const popularPills = document.querySelectorAll('#popular .pillbox-background');
            popularPills.forEach(pill => {
                pill.addEventListener('click', async function () {
                    popularPills.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    await updateTrendingTop20MovieContent('popular', this.getAttribute('data-airing-type'));
                });
            });
        } else {
            const trendingSelect = document.getElementById('trending');

            trendingSelect.classList.add("active");

            trendingSelect.addEventListener('change', async function () {
                await updateTrendingTop20MovieContent('trending', this.value);
                this.classList.add("active");
            });

            const popularSelect = document.getElementById('popular');

            popularSelect.classList.add("active");
            popularSelect.addEventListener('change', async function () {
                await updateTrendingTop20MovieContent('popular', this.value);
                this.classList.add("active");
            });
        }

        await updateTrendingTop20MovieContent('trending', 'day');
        await updateTrendingTop20MovieContent('popular', 'on_the_air');
    };

    renderHomePage();

    window.addEventListener('resize', () => {
        renderHomePage();
    });
}


const updateTrendingTop20MovieContent = async (idType, attr) => {
    const movies = await getTrendingTop20(attr);
    const carouselTrack = document.querySelector(`.${idType}-carousel-track`);

    if (carouselTrack) {
        carouselTrack.innerHTML = '';

        movies.forEach(async (movie) => {
            const item = document.createElement('div');
            item.classList.add(`${idType}-carousel-track-item`);
    
            const img = document.createElement('img');
            img.src = `${posterBaseUrl}${movie.poster_path}`;
            img.alt = movie.original_title || movie.title || movie.name || movie.original_name;
    
            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('percent');
            ratingDiv.innerHTML = `<div>${movie.vote_average.toFixed(1)}</div>`;
    
            if (movie.vote_average < 5) {
                ratingDiv.classList.add("low");
            } else if (movie.vote_average < 7.5) {
                ratingDiv.classList.add("medium");
            } else {
                ratingDiv.classList.add("high");
            }
    
            const metadataDiv = document.createElement('div');
            metadataDiv.classList.add('metadata');
    
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('boldTitle');
            const aTag = document.createElement('a');
            if (idType === 'trending') {
                const url = `/details/movie/${movie.id}`;
                aTag.href = url;
                aTag.onclick = (event) => navigateTo(event, url);
            } 
            else {
                const url = `/details/tv/${movie.id}`;
                aTag.href = url;
                aTag.onclick = (event) => navigateTo(event, url);
            }

            aTag.textContent =  movie.original_title || movie.title || movie.name || movie.original_name;
            titleDiv.appendChild(aTag);
        
            const releaseDateDiv = document.createElement('div');
            releaseDateDiv.classList.add('fontColor');
            releaseDateDiv.textContent = movie.release_date || movie.first_air_date || '';
    
            metadataDiv.appendChild(titleDiv);
            metadataDiv.appendChild(releaseDateDiv);
    
            item.appendChild(img);
            item.appendChild(ratingDiv);
            item.appendChild(metadataDiv);
    
            carouselTrack.appendChild(item);
        });
    }
};