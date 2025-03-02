import { getHomePage } from '../templates/homepage.js';
import { getMovieDetails } from '../templates/moviedetails.js';
import { getTvDetails } from '../templates/tvdetails.js';

const routes = {
    '/': getHomePage,
    '/details/movie/:id': getMovieDetails,
    '/details/tv/:id': getTvDetails
}

export const navigateTo = (event, url) => {
    if (event?.preventDefault) event.preventDefault();
    window.history.pushState(null, null, url);
    handleRoute();
};

const handleRoute = () => {
    const path = window.location.pathname;

    if (path === "/" && routes["/"]) {
        routes["/"]();
        return;
    }
    
    for (const route in routes) {
        const regex = new RegExp("^" + route.replace(/:\w+/g, "(\\w+)") + "$");
        const match = path.match(regex);

        if (match) {
            const params = match.slice(1);
            console.log(params);
            routes[route](...params);
            return;
        }
    }

    const notFound = document.createElement('div');
    notFound.classList.add('not-found-img');
    document.getElementById('content').appendChild(notFound);
}

window.addEventListener("popstate", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);
