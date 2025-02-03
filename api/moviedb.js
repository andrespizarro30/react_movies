import axios from "axios";
import { TOKEN,API_URL_TRENDING_MOVIES,API_URL_UPCOMING_MOVIES,API_URL_TOP_RATED_MOVIES, API_URL_MOVIE_DETAILS_URL, API_URL_MOVIE_CREDITS_URL, API_URL_MOVIE_SIMILAR_URL, API_URL_PERSON_URL, API_URL_PERSON_MOVIES_URL, API_URL_SEARCH_MOVIES_URL } from "../constants";

const apiCall = async (endpoint,params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json"
        }
    }

    try{
        const response = await axios.request(options);
        // const response = await axios.get(endpoint, {
        //     headers: {
        //         Authorization: `Bearer ${TOKEN}`,
        //         Accept: "application/json"
        //     }
        // });
        return response.data;
    }catch(error){
        console.log(error);
        return {};
    }
}

export const fetchTrendingMovies = ()=>{
    return apiCall(API_URL_TRENDING_MOVIES);
}

export const fetchUpcomingMovies = ()=>{
    return apiCall(API_URL_UPCOMING_MOVIES);
}

export const fetchTopRatedMovies= ()=>{
    return apiCall(API_URL_TOP_RATED_MOVIES);
}

export const fetchMovieDetails= (id)=>{
    console.log(API_URL_MOVIE_DETAILS_URL(id));
    return apiCall(API_URL_MOVIE_DETAILS_URL(id));;
}

export const fetchMovieCredits= (id)=>{
    console.log(API_URL_MOVIE_CREDITS_URL(id));
    return apiCall(API_URL_MOVIE_CREDITS_URL(id));;
}

export const fetchMovieSimilars= (id)=>{
    console.log(API_URL_MOVIE_SIMILAR_URL(id));
    return apiCall(API_URL_MOVIE_SIMILAR_URL(id));;
}

export const fetchPersonDetails= (id)=>{
    console.log(API_URL_PERSON_URL(id));
    return apiCall(API_URL_PERSON_URL(id));;
}

export const fetchPersonMovies= (id)=>{
    console.log(API_URL_PERSON_MOVIES_URL(id));
    return apiCall(API_URL_PERSON_MOVIES_URL(id));;
}

export const fetchSearchMovies = (params)=>{
    console.log(params);
    return apiCall(API_URL_SEARCH_MOVIES_URL,params);;
}
