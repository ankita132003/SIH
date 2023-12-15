
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../Screens/HomeScreen";
import DetailScreen from "../Screens/DetailScreen";
import NtripClientScreen from "../Screens/NtripClientScreen";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NtripClient">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="NtripClient" component={NtripClientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
