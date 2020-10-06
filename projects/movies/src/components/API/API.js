import axios from "axios";

// Key and URLs for API calls
const KEY = "42ab08e5fe20de73e5d116b3b8aa6f2d";
const URL = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${URL}/movie/now_playing`;
const searchByNameUrl = `${URL}/search/movie`;
const popularUrl = `${URL}/movie/popular`;
const topRatedUrl = `${URL}/movie/top_rated`;
const upcomingUrl = `${URL}/movie/upcoming`;
const movieUrl = `${URL}/movie/`;
const params = {
    params: {
        api_key: KEY,
    },
};

//API call for Now Playing movies
export const nowPlaying = async () => {
    return await axios.get(nowPlayingUrl, params);
};

//API call for Popular movies
export const popular = async () => {
    return await axios.get(popularUrl, params);
};

//API call for Top Rated Movies
export const topRated = async () => {
    return await axios.get(topRatedUrl, params);
};

//API call for Upcoming movies
export const upcoming = async () => {
    return await axios.get(upcomingUrl, params);
};

//API call for search movie by name
export const searchByName = async (value) => {
    return await axios.get(searchByNameUrl, {
        params: {
            api_key: KEY,
            query: value,
        },
    });
};

//API call for movie trailer
export const movieVideos = async (value) => {
    const video = await axios.get(`${movieUrl}${value}/videos`, params);
    if (video.data.results.length === 0) {
        return "hQAHSlTtcmY";
    } else {
        return video.data.results[0].key;
    }
};

//API call for Actors
export const movieActors = async (value) => {
    const actors = await axios.get(`${movieUrl}${value}/credits`, params);
    console.log(actors.data.cast.slice(0, 5));
    return actors.data.cast.slice(0, 5);
};
