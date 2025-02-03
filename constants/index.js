export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const IMAGE342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const IMAGE185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;
export const API_URL_TRENDING_MOVIES = `${BASE_URL}/trending/movie/day`;
export const API_URL_UPCOMING_MOVIES = `${BASE_URL}/movie/upcoming`;
export const API_URL_TOP_RATED_MOVIES = `${BASE_URL}/movie/top_rated`;
export const API_URL_MOVIE_DETAILS_URL = id => `${BASE_URL}/movie/${id}`;
export const API_URL_MOVIE_CREDITS_URL = id => `${BASE_URL}/movie/${id}/credits`;
export const API_URL_MOVIE_SIMILAR_URL = id => `${BASE_URL}/movie/${id}/similar`;
export const API_URL_PERSON_URL = id => `${BASE_URL}/person/${id}`;
export const API_URL_PERSON_MOVIES_URL = id => `${BASE_URL}/person/${id}/movie_credits`;
export const API_URL_SEARCH_MOVIES_URL = `${BASE_URL}/search/movie`;
export const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTFmZjg3NzNmYWNjZWQ1ZDJiNTNjZWIxMTU4MjA0ZiIsIm5iZiI6MTYyMTYxMTgwNy41NDMsInN1YiI6IjYwYTdkNTFmN2RmZGE2MDA0MTc5MzA3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7hiQ_Y10obH78Rue57JsBanXBkbqj8ACj04JeJc9pQ8";
