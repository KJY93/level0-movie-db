const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzY0MTMzMDg0NjQ1ZGQ3NTM2MjUzZTg4MTBiOTg3MyIsIm5iZiI6MTc0MDQ2OTg1MS4zOTY5OTk4LCJzdWIiOiI2N2JkNzY1Yjc2OTA0YzU5Yzg1ZTk1ODQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LNlOZqYC1NWK3kEMcewW_KCV4_eyT5d8K-GIzXlaVkU';


export const posterBaseUrl = 'https://media.themoviedb.org/t/p/w220_and_h330_face';
export const backdropBaserUrl = 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces';

export const getTrendingTop20 = async (attr) => {
    try {
        const headers = getHeaders();
        let response;
        if (attr === 'day' || attr === 'week') {
            response = await axios.get(`https://api.themoviedb.org/3/trending/movie/${attr}?language=en-US`, {headers});
        }
        else {
            response = await axios.get(`https://api.themoviedb.org/3/tv/${attr}?language=en-US&page=1`, {headers});
        }
        return response.data.results;
    }
    catch (error) {
        logger(error);
        return [];
    }
}

export const getMoviesOrTvDetails = async (movieId, typeOfMedia) => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`https://api.themoviedb.org/3/${typeOfMedia}/${movieId}?language=en-US`, {headers});

        return response.data;
    }
    catch (error) {
        logger(error);
        return [];
    }
}

const getHeaders = () => {
    return {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
    }
}

const logger = (error) => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
}
