// DetailsScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

function DetailsScreen() {
  const Permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your Location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [currentLocation, setCurrentLocation] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        console.log(latitude, longitude);
        console.log(position.coords);
      },
      error => alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const openMaps = () => {
    const {latitude, longitude} = currentLocation;
    if ((latitude, longitude)) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      alert('location not available');
    }
  };

  useEffect(()=>{
    Permission();
  },[])
  
  return (
    <View>
      <Text>Get Coords</Text>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          margin: 10,
          alignItems: 'center',
        }}>
        <Text>
          Latitude :{' '}
          {currentLocation ? currentLocation.latitude : 'Loading.....'}
        </Text>
        <Text>
          Longitude :{' '}
          {currentLocation ? currentLocation.longitude : 'Loading.....'}
        </Text>
      </View>

      {currentLocation ? (
        <>
          <TouchableOpacity onPress={openMaps}>
            <View style={{backgroundColor: 'black'}}>
              <Text>Open Maps</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={Permission}>
            <View style={{backgroundColor: "black"}}>
              <Text>Get Location</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default DetailsScreen;
