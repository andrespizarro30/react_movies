import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform,Dimensions,Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { IMAGE500 } from '../constants';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieSimilars } from '../api/moviedb';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-12';
const leftMargin = ios ? 'ml-4' : '';
const rightMargin = ios ? 'mr-8' : '';
const { width, height } = Dimensions.get("window");

const MovieScreen = () => {

    const {params: item} = useRoute();
    const [isFavorite, setIsFavorite] = useState(false)
    const navigation = useNavigation();

    const [details, setDetails] = useState({})
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        getDetailMovies();
        getCreditMovies();
        getSimilarMovies();
      },[])

      const getDetailMovies = async ()=>{
        const data = await fetchMovieDetails(item.id);
        if(data && data) setDetails(data);
        setLoading(false);
      }
    
      const getCreditMovies = async ()=>{
        const data = await fetchMovieCredits(item.id);
        //console.log("CREDITS");
        // console.log(data.cast);
        if(data && data.cast) setCast(data.cast);
      }
    
      const getSimilarMovies = async ()=>{
        const data = await fetchMovieSimilars(item.id);
        // console.log("SIMILAR");
        // console.log(data.results);
        if(data && data.results) setSimilarMovies(data.results);
      }

  return (
    <ScrollView
        contentContainerStyle={{paddingBottom:20}}
        className={`flex-1 bg-neutral-900`}
    >
        <View className={`w-full`}>
            <SafeAreaView pointerEvents="box-none" className={`${topMargin} ${leftMargin} absolute z-20 w-full flex-row justify-between items-center px-4`}>
                <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=>navigation.navigate("Home")}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                </TouchableOpacity >
                <TouchableOpacity  className={`rounded-xl p-1 ${rightMargin}`} onPress={()=>setIsFavorite(!isFavorite)}>
                    <HeartIcon size="35" color={isFavorite ? styles.background.backgroundColor : 'white'}/>
                </TouchableOpacity >
            </SafeAreaView>
            {
                loading ? (
                    <Loading/>
                ):(
                    <View>
                        <Image
                            source={{uri: IMAGE500(details.poster_path)}}
                            style={{width: width, height: height*0.6}}
                        />
                        <LinearGradient
                            colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                            style={{width:width,height: height*0.10}}
                            start={{x:0.5,y:0}}
                            end={{x:0.5,y:1}}
                            className="absolute bottom-0"
                        />
                    </View>                    
                )
            }
        </View>
        <View style={{marginTop: -(height*0.09)}} className="">
            <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {details?.title}
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
                {details?.status} • {details?.release_date?.split("-")[0]} • {details?.runtime} min
            </Text>
            <View className="flex-row justify-center mx-4 space-x-2">
                {
                    details.genres && details.genres.map((genre,index)=>{
                        let showDot = index+1 != details.genres.length;
                        return(
                            <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                {genre.name} {showDot ? "• " : ""}
                            </Text>
                        )
                    })
                }
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide">
                {details.overview}
            </Text>
        </View>

        {cast.length>0 && <Cast cast={cast} navigation={navigation}/>}

        {similarMovies.length>0 && <MovieList title={"Similar Movies"} data={similarMovies} hideSeeAll={true}/>}

    </ScrollView>
  )
}

export default MovieScreen