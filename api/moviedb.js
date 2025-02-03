import axios from "axios";
import { TOKEN,API_URL_TRENDING_MOVIES,API_URL_UPCOMING_MOVIES,API_URL_TOP_RATED_MOVIES } from "../constants";

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
