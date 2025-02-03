import { StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions, Image,FlatList  } from 'react-native'
import React, {StrictMode} from 'react'
import Carousel from 'react-native-reanimated-carousel';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { IMAGE500 } from '../constants';
//import DeviceLocation from '../api/location';
//import LocationTracker from '../api/location';

const { width, height } = Dimensions.get("window");

export default function TrendingMovies({data}){

  //const {latitude, longitude, errorMsg} = LocationTracker();

  const navigation = useNavigation();

  const handleClick = (item) => {
    //console.log(item);
    navigation.navigate('Movie',item)
  };

  const itemWidth = width * 0.8; // Each item takes 80% of the screen width
  const sliderWidth = width;

  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
      opacity: animatedValue.value
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:"flex-start", marginHorizontal: 0  }}>
      <View style={{ flex: 1, alignItems: 'flex-start', marginHorizontal: 0  }}>
        <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
      </View>
      {/* {
        errorMsg !== "" ? 
        (<Text className="text-white">{errorMsg}</Text>) :
        (<Text className="text-white">{latitude},{longitude}</Text> )
      }  */}
      <FlatList
            data={data}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                    <MovieCard item={item} handleClick={()=>handleClick(item)}/>
                </View>
            )}
        />
      {/* <Carousel
        key={data.id}
        //loop
        width={sliderWidth} // Set the carousel to take the full width of the screen
        height={height * 0.45} // Set the height of each carousel item (adjust as needed)
        data={data}
        scrollAnimationDuration={100} // Animation duration for scrolling
        renderItem={({ item }) => (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 }}>
            <MovieCard item={item} handleClick={()=>handleClick(item)} />
          </View>
        )}
        itemWidth={itemWidth} // Set item width
        onSnapToItem={(index) => console.log('Current index:', index)}
        gap={10} // Controls the gap between the items
        slideStyle={{display: 'flex', alignItems: 'center'}}
      /> */}
    </View>    
  )
}

const MovieCard = ({item,handleClick})=>{
  return(
    <TouchableWithoutFeedback key={item} onPress={handleClick}>
      <Image 
        source={{uri: IMAGE500(item.poster_path)}}
        style={{
          width: width * 0.6,
          height: height * 0.4
        }}
        className="rounded-3xl"
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  )
}