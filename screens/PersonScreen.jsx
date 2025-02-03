import { StyleSheet, Text, View, ScrollView,SafeAreaView,TouchableOpacity,Platform,Dimensions,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useRoute,useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../theme';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';
const topMargin = ios ? '' : 'mt-12';
const leftMargin = ios ? 'ml-4' : '';
const rightMargin = ios ? 'mr-8' : '';
const { width, height } = Dimensions.get("window");

const PersonScreen = () => {

    const {params: item} = useRoute();
    const [isFavorite, setIsFavorite] = useState(false)
    const [personMovies, setPersonMovies] = useState([1,2,3,4,5,6])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    useEffect(()=>{
        //call movie details API
    },[])

  return (
    <ScrollView
        contentContainerStyle={{paddingBottom:20}}
        className={`flex-1 bg-neutral-900`}
    >
        <SafeAreaView className={`${topMargin} ${leftMargin} absolute z-20 w-full flex-row justify-between items-center px-4`}>
            <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=>navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
            </TouchableOpacity >
            <TouchableOpacity  className={`rounded-xl p-1 ${rightMargin}`} onPress={()=>setIsFavorite(!isFavorite)}>
                <HeartIcon size="35" color={isFavorite ? 'red' : 'white'}/>
            </TouchableOpacity >
        </SafeAreaView>
        {
            loading ? (
                <Loading/>
            ):(
                <View>
                    <View className="flex-row justify-center mt-11"
                        style={{
                            shadowColor:'gray',
                            shadowRadius: 40,
                            shadowOffset: {width:0,height:5},
                            shadowOpacity: 1,
                            elevation: 10,
                        }}
                    >
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500 mt-11"
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.5,
                                elevation: 10,
                            }}
                        >
                            <Image 
                                source={require('../assets/images/KeanuReeves.jpg')}
                                style={{height: height*0.43, width: width*0.74}}
                            />
                        </View>
                    </View>
                    <View className="mt-6">
                        <Text className="text-3xl text-white font-bold text-center">
                            Keanu Reeves
                        </Text>
                        <Text className="text-base text-neutral-500 text-center">
                            London, United Kingdom
                        </Text>
                    </View>
                    <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Gender</Text>
                            <Text className="text-neutral-300 text-sm">Male</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Birthday</Text>
                            <Text className="text-neutral-300 text-sm">1964-09-02</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Known for</Text>
                            <Text className="text-neutral-300 text-sm">Acting</Text>
                        </View>
                        <View className="px-2 items-center">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-300 text-sm">64.23</Text>
                        </View>
                    </View>
                    <View className="my-6 mx-4 space-y-2">
                        <Text className="text-white text-lg">Biography</Text>
                        <Text className="text-neutral-400 tracking-wide">
                            Keanu Charles Reeves is a Canadian actor and musician. He is the recipient of numerous accolades in a career on screen spanning four decades. In 2020, The New York Times ranked him as the fourth-greatest actor of the 21st century, and in 2022 Time magazine named him one of the 100 most influential people in the world.
                            Keanu Charles Reeves is a Canadian actor and musician. He is the recipient of numerous accolades in a career on screen spanning four decades. In 2020, The New York Times ranked him as the fourth-greatest actor of the 21st century, and in 2022 Time magazine named him one of the 100 most influential people in the world.
                            Keanu Charles Reeves is a Canadian actor and musician. He is the recipient of numerous accolades in a career on screen spanning four decades. In 2020, The New York Times ranked him as the fourth-greatest actor of the 21st century, and in 2022 Time magazine named him one of the 100 most influential people in the world.
                            Keanu Charles Reeves is a Canadian actor and musician. He is the recipient of numerous accolades in a career on screen spanning four decades. In 2020, The New York Times ranked him as the fourth-greatest actor of the 21st century, and in 2022 Time magazine named him one of the 100 most influential people in the world.
                        </Text>
                    </View>
                    <MovieList title={"Keanu Reeves Movies"} data={personMovies} hideSeeAll={true}></MovieList>
                </View>
            )
        }
    </ScrollView>
  )
}

export default PersonScreen