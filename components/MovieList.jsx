import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View,Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { IMAGE185, IMAGE500 } from '../constants';

const { width, height } = Dimensions.get("window");

const MovieList = ({title,data, hideSeeAll}) => {

  const navigation = useNavigation()

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {
          !hideSeeAll && 
          (
            <TouchableOpacity>
              <Text style={styles.text} className="text-lg">See All</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            data.map((item,index)=>{

                let movieName = item.title;
                let posterImage = IMAGE185(item.poster_path)

                return(
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={()=>{
                            console.log("pressed",item);
                            navigation.navigate('Movie', item);
                        }}
                    >
                        <View className="space-y-1 mr-4" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 15  }}>
                            <Image
                                source={{uri:posterImage}}
                                className='rounded-3xl'
                                style={{width:width*0.33, height:height*0.22}}
                            />
                            <Text className="text-neutral-300 ml-1">
                                {
                                    movieName.length>14 ? movieName.slice(0,14)+'...' : movieName
                                }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }        
      </ScrollView>
    </View>
  )
}

export default MovieList
