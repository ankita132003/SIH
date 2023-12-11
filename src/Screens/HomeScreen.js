// HomeScreen.js

import React , {useEffect , useState} from "react";


import {
    Text,
    View,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    NativeModules,
    useColorScheme,
    TouchableOpacity,
    NativeEventEmitter,
    PermissionsAndroid,
  } from 'react-native';
  import BleManager from 'react-native-ble-manager';

function HomeScreen() {


    useEffect(() => {
        // turn on bluetooth if it is not on
        BleManager.enableBluetooth().then(() => {
          console.log('Bluetooth is turned on!');
        });
    
          if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('Permission is OK');
            } else {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ).then(result => {
                if (result) {
                  console.log('User accept');
                } else {
                  console.log('User refuse');
                }
              });
            }
          });
        }
    
      }, []);

      useEffect(() => {
        // start bluetooth manager
        BleManager.start({showAlert: false}).then(() => {
          console.log('BleManager initialized');
        });
      }, []);


    const backgroundStyle = {
        backgroundColor: '#ffffff',
      };
  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
    <StatusBar
      barStyle={ 'light-content'}
      backgroundColor={backgroundStyle.backgroundColor}
    />
    <ScrollView
      style={backgroundStyle}
      contentContainerStyle={styles.mainBody}
      contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          backgroundColor: backgroundStyle.backgroundColor,
          marginBottom: 40,
        }}>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: '#000000'
            }}>
            React Native BLE 
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Scan Bluetooth Devices </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}


const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default HomeScreen;
