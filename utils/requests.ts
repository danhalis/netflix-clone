import { MOVIE_BASE_URL } from "../constants/tmdbApi";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const requests = {
	fetchTrending: `${MOVIE_BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `${MOVIE_BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
	fetchTopRated: `${MOVIE_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `${MOVIE_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
	fetchComedyMovies: `${MOVIE_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
	fetchHorrorMovies: `${MOVIE_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
	fetchRomanceMovies: `${MOVIE_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
	fetchDocumentaries: `${MOVIE_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

export default requests;