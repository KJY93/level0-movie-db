// import { getTrendingTop20 } from '../services/movies.service.js';

// export const posterBaseUrl = 'https://media.themoviedb.org/t/p/w220_and_h330_face';



// document.addEventListener('DOMContentLoaded', async function () {
//     const dropdownIcon = document.getElementById('dropdown-icon');
//     const dropdownMenu = document.getElementById('dropdown-menu');

//     dropdownIcon.addEventListener('click', function () {
//         dropdownMenu.classList.toggle('show');
//     });

//     updateTrendingTop20MovieContent('trending', 'day');

//     const trendingPills = document.querySelectorAll('#trending .pillbox-background');

//     trendingPills.forEach(pill => {
//         pill.addEventListener('click', function () {
//             trendingPills.forEach(p => p.classList.remove('active'));
//             this.classList.add('active');

//             updateTrendingTop20MovieContent('trending', this.getAttribute('data-frequency'));
//         })
//     })

//     updateTrendingTop20MovieContent('popular', 'on_the_air');
//     const popularPills = document.querySelectorAll('#popular .pillbox-background');
//     popularPills.forEach(pill => {
//         pill.addEventListener('click', function () {
//             popularPills.forEach(p => p.classList.remove('active'));
//             this.classList.add('active');
//             updateTrendingTop20MovieContent('popular', this.getAttribute('data-airing-type'));
//         })
//     })

// })

// const updateTrendingTop20MovieContent = async (idType, attr) => {
//     const movies = await getTrendingTop20(attr);
//     const carouselTrack = document.querySelector(`.${idType}-carousel-track`);

//     if (carouselTrack) {
//         carouselTrack.innerHTML = '';

//         movies.forEach(async (movie) => {
//             const item = document.createElement('div');
//             item.classList.add(`${idType}-carousel-track-item`);
    
//             const img = document.createElement('img');
//             img.src = `${posterBaseUrl}${movie.poster_path}`;
//             img.alt = movie.original_title || movie.title || movie.name || movie.original_name;
    
//             const ratingDiv = document.createElement('div');
//             ratingDiv.classList.add('percent');
//             ratingDiv.innerHTML = `<div>${movie.vote_average.toFixed(1)}</div>`;
    
//             if (movie.vote_average < 5) {
//                 ratingDiv.classList.add("low");
//             } else if (movie.vote_average < 7.5) {
//                 ratingDiv.classList.add("medium");
//             } else {
//                 ratingDiv.classList.add("high");
//             }
    
//             const metadataDiv = document.createElement('div');
//             metadataDiv.classList.add('metadata');
    
//             const titleDiv = document.createElement('div');
//             titleDiv.classList.add('boldTitle');
//             const aTag = document.createElement('a');
//             if (idType === 'trending') {
//                 aTag.href = `/details/movie/${movie.id}`
//             } 
//             else {
//                 aTag.href = `/details/tv/${movie.id}`
//             }

//             aTag.textContent =  movie.original_title || movie.title || movie.name || movie.original_name;
//             titleDiv.appendChild(aTag);
        
    
//             const releaseDateDiv = document.createElement('div');
//             releaseDateDiv.classList.add('fontColor');
//             releaseDateDiv.textContent = movie.release_date || movie.first_air_date || '';
    
//             metadataDiv.appendChild(titleDiv);
//             metadataDiv.appendChild(releaseDateDiv);
    
//             item.appendChild(img);
//             item.appendChild(ratingDiv);
//             item.appendChild(metadataDiv);
    
//             carouselTrack.appendChild(item);
//         });
//     }
// };


// const togglePillboxView = (id) => {
//     const container = document.querySelector(`#${id}`);
//     if (window.innerWidth < 600) {
//         if (!container.querySelector('select')) {
//             const select = document.createElement("select");
//             const activePillbox = document.querySelector(`#${id} .pillbox-background.active`);
            
//             let currentSelection = '';

//             if (id === 'trending') {
//                 currentSelection = activePillbox ? activePillbox.dataset.frequency : "day"; 
//             }
            
//             if (id === 'popular') {
//                 currentSelection = activePillbox ? activePillbox.dataset.airingType : "on_the_air";
//             }
             
//             document.querySelectorAll(`#${id} .pillbox-background`).forEach(pillbox => {
//                 const option = document.createElement("option");
//                 if (id === 'trending') {
//                     option.value = pillbox.dataset.frequency;
//                 }

//                 if (id === 'popular') {
//                     option.value = pillbox.dataset.airingType;
//                 }
            
//                 option.textContent = pillbox.textContent;

//                 if (option.value === currentSelection) {
    
//                     option.selected = true;
//                     select.classList.add("active"); 
//                 }
//                 select.appendChild(option);
//             });

//             container.innerHTML = "";
//             container.appendChild(select);

//             // listen on select rather than option
//             select.addEventListener("change", function (event) {
//                 updateTrendingTop20MovieContent(`${id}`, event.target.value);

//                 document.querySelectorAll(`#${id} .pillbox-background`).forEach(pillbox => {
//                     pillbox.classList.remove("active");
//                 });

//                 const newActivePillbox = document.querySelector(`#${id} .pillbox-background[data-frequency='${event.target.value}']`);
//                 if (newActivePillbox) {
//                     newActivePillbox.classList.add("active");
//                 }
//             });
//         }
//     }
//     else {
//         const existingSelect = container.querySelector("select");
//         if (existingSelect) {
//             container.innerHTML = ""; 
            
//             let options = [];
//             let objKey = null;

//             if (id === 'trending') {
//                 options = ["day", "week"];
//                 objKey = 'frequency';
//             }
            
//             if (id === 'popular') {
//                 options = ["on_the_air", "popular", "top_rated"];
//                 objKey = 'airingType';
//             }

//             options.forEach((freq, index) => {
//                 const div = document.createElement("div");
//                 div.classList.add("pillbox-background");
//                 div.dataset[objKey] = freq;
//                 if (objKey === 'frequency') {
//                     div.textContent = freq === "day" ? "Today" : "This Week";
//                 }
                
//                 if (objKey === 'airingType') {
//                     div.textContent = freq === "on_the_air" ? "On The Air" : freq === "popular" ? "Popular" : "Top Rated";
//                 }


//                 if (index === 0) {
//                     div.classList.add("active");
//                 }

//                 div.addEventListener("click", function () {
//                     document.querySelectorAll(`#${id} .pillbox-background`).forEach(el => 
//                         el.classList.remove("active")
//                     );
//                     this.classList.add("active");
//                     updateTrendingTop20MovieContent(`${id}`, freq);
//                 });

//                 container.appendChild(div);
//             });
//         }
//     }
// }

// window.addEventListener('resize', () => togglePillboxView('trending'));
// window.addEventListener("load", () => togglePillboxView('trending'));
// window.addEventListener('resize', () => togglePillboxView('popular'));
// window.addEventListener("load", () => togglePillboxView('popular'));
