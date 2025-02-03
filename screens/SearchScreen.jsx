import { StyleSheet, Text, View,Dimensions,Platform, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, {useCallback, useState} from 'react'
import { useNavigation } from '@react-navigation/native'; 
import { XMarkIcon } from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import { fetchSearchMovies } from '../api/moviedb';
import { IMAGE342 } from '../constants';
import debounce from 'lodash/debounce';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';
const topMargin = ios ? 'mt-4' : 'mt-12';
const leftMargin = ios ? 'ml-4' : '';
const rightMargin = ios ? 'mr-8' : '';
const { width, height } = Dimensions.get("window");

const SearchScreen = () => {

  let [results,setResults] = useState([]);

  const [loading, setLoading] = useState(false)

  const changeTextHandler=(searchText)=>{
    if(searchText && searchText.length>2){
        setLoading(true);
        searchMovieByName(searchText);
    }else{
        setLoading(false);
        setResults([]);
    }   
  }
    
    const searchMovieByName = async (searchText)=>{

        console.log(searchText);

        fetchSearchMovies({
            query: searchText,
            include_adult:'false',
            language:'en-US',
            page:'1'
        }).then(data=>{
            setLoading(false);
            data && setResults(data.results);
        })
        
    }

  const handleTextDebounce = useCallback(debounce(changeTextHandler,400),[]);

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
        <View className={`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ${topMargin}`}>
            <TextInput
                placeholder='Search Movie'
                placeholderTextColor={"lightgray"}
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                onChangeText={handleTextDebounce}
            />
            <TouchableOpacity
                onPress={()=>{navigation.navigate("Home")}}
                className="rounded-full p-3 m-1 bg-neutral-500"
            >
                <XMarkIcon size="25" color="white"/>
            </TouchableOpacity>
        </View>
        {
            loading ?(
                <Loading/>
            ):(
                results.length>0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal:15}}
                        className="space-y-3"
                    >
                        <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                        <View className="flex-row justify-between flex-wrap">
                            {
                                results.length>0 && results.map((item,index)=>{

                                    const movieName = item.title;
                                    const moviePoster = item.poster_path;

                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            onPress={()=>navigation.push("Movie",item)}
                                        >
                                            <View className="space-y-2 mb-4">
                                                <Image className="rounded-3xl"
                                                    source={{uri: IMAGE342(moviePoster)}}
                                                    style={{width:width*0.44, height:height*0.3}}
                                                />
                                                <Text className="text-neutral-300 ml-1">
                                                    {movieName.length>22 ? movieName.slice(0,22)+'...' : movieName}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-row justify-center">
                        <Image
                            source={require('../assets/images/movietime.jpg')}
                            className="h-60 w-96"
                        />
                    </View>
                )
            )
        }
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})