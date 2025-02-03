import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import * as Location from 'expo-location'

const DeviceLocation = () => {

  const [errorMsg, setErrorMsg] = useState("finding location")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getUserLocation = async ()=>{

    let {status} = await Location.requestForegroundPermissionsAsync();

    if(status !== "granted"){
        setErrorMsg("Permission for location not granted");
        return;
    }

    let {coords} = await Location.getCurrentPositionAsync();

    if(coords){
        const {latitude, longitude} = coords;
        console.log("Lat and long are", latitude, longitude);
        setErrorMsg("");
        setLatitude(latitude);
        setLongitude(longitude);
        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });
        console.log(response);
    };
  };

  useEffect(()=>{
    getUserLocation();
  },[]);


  return {latitude, longitude, errorMsg};

}

export default function LocationTracker(){

    const [location, setLocation] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [errorMsg, setErrorMsg] = useState("finding location");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
  
    // Request permissions
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to use this feature.');
        setErrorMsg("Permission for location not granted");
        return false;
      }
      return true;
    };
  
    // Start location tracking
    const startLocationUpdates = async () => {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;
  
      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Updates every 5 seconds
          distanceInterval: 10, // Updates every 10 meters
        },
        (newLocation) => {
          //setLocation(newLocation.coords);
          console.log("LOCATION DATA");
          console.log(newLocation);
          setErrorMsg("");
          setLatitude(newLocation.coords.latitude);
          setLongitude(newLocation.coords.longitude);
        }
      );
  
      setSubscription(sub);
    };
  
    // Stop location tracking
    const stopLocationUpdates = () => {
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
    };
  
    useEffect(() => {
      startLocationUpdates();
      return () => stopLocationUpdates();
    }, []);

    return {latitude, longitude, errorMsg};
  
    // return (
    //   <View>
    //     {location ? (
    //       <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
    //     ) : (
    //       <Text>Waiting for location updates...</Text>
    //     )}
    //     <Button title="Start Tracking" onPress={startLocationUpdates} />
    //     <Button title="Stop Tracking" onPress={stopLocationUpdates} />
    //   </View>
    // );
  };
  