import { StyleSheet, Text, View,Dimensions,Platform, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'; 
import { XMarkIcon } from 'react-native-heroicons/outline';
import Loading from '../components/Loading';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';
const topMargin = ios ? 'mt-4' : 'mt-12';
const leftMargin = ios ? 'ml-4' : '';
const rightMargin = ios ? 'mr-8' : '';
const { width, height } = Dimensions.get("window");

const SearchScreen = () => {

  const [searchText, setSearchText] = useState('');
  let [results,setResults] = useState([]);

  const [loading, setLoading] = useState(false)

  const changeTextHandler=(searchText)=>{
    setSearchText(searchText)
    results=[];
    for (let i = 0; i < searchText.length; i++) {
        results.push(searchText.length)
    }
    setResults(results)
  }

  let movieName = "Ant-Man and the Wasp: Quantumania";

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
        <View className={`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ${topMargin}`}>
            <TextInput
                value={searchText}
                placeholder='Search Movie'
                placeholderTextColor={"lightgray"}
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                onChangeText={(searchText)=>changeTextHandler(searchText)}
            />
            <TouchableOpacity
                onPress={()=>{navigation.goBack()}}
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
                                results.map((item,index)=>{
                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            onPress={()=>navigation.push("Movie",item)}
                                        >
                                            <View className="space-y-2 mb-4">
                                                <Image className="rounded-3xl"
                                                    source={require('../assets/images/harrypotter.jpg')}
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