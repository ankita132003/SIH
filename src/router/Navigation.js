
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../Screens/HomeScreen";
import DetailScreen from "../Screens/DetailScreen";
import Map from "../Screens/Map";
import StoreLocation from "../Screens/StoreLocation";


const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="StoreLocation" component={StoreLocation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
