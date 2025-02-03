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

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-12';
const leftMargin = ios ? 'ml-4' : '';
const rightMargin = ios ? 'mr-8' : '';
const { width, height } = Dimensions.get("window");

const MovieScreen = () => {

    const {params: item} = useRoute();
    const [isFavorite, setIsFavorite] = useState(false)
    const navigation = useNavigation();
    useEffect(()=>{
        console.log(item.id);
    },[])

    //console("MOVIE SCREEN", item);

    let movieName = item.original_title;
    let moviePoster = IMAGE500(item.poster_path);
    let movieOverview = item.overview;

    const [cast, setCast] = useState([1,2,3,4,5,6,7,8,9,10])
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5,6])

    const [loading, setLoading] = useState(false)

  return (
    <ScrollView
        contentContainerStyle={{paddingBottom:20}}
        className={`flex-1 bg-neutral-900`}
    >
        <View className={`w-full`}>
            <SafeAreaView pointerEvents="box-none" className={`${topMargin} ${leftMargin} absolute z-20 w-full flex-row justify-between items-center px-4`}>
                <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=>navigation.goBack()}>
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
                            source={{uri: moviePoster}}
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
                {movieName}
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
                Release * {item.release_date} * 170 min
            </Text>
            <View className="flex-row justify-center mx-4 space-x-2">
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Action * 
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Thrill * 
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Comedy
                </Text>
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide">
                {movieOverview}
            </Text>
        </View>

        <Cast cast={cast} navigation={navigation}/>

        {/* <MovieList title={"Similar Movies"} data={similarMovies} hideSeeAll={true}/> */}

    </ScrollView>
  )
}

export default MovieScreen