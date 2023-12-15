import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput  , StyleSheet, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';


const NtripClientScreen = () => {
  const [socket, setSocket] = useState(null);
  const [mountPoint, setMountPoint] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);



  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        console.log(position.coords);
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);


  const connectToSocket = () => {
    // Replace the URL with your WebSocket server URL
    const newSocket = new WebSocket('ws://192.168.175.246:8000/ws/dsa/');
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
      Alert.alert('WebSocket connection opened');
    }


    newSocket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      Alert.alert('WebSocket message received:', event.data);
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
    };
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        sendMessage();
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const sendMessage = () => {
    if (socket) {
      const message = {
        mountPoint: mountPoint,
        username: username,
        password: password,
        latitude: location.latitude,
        longitude: location.longitude,
        altitude: location.altitude,
      };
      const jsonString = JSON.stringify({ message: message }); // Corrected this line
      socket.send(jsonString);
    }
  };
  
  

  return (
    <View>
      <Text>WebSocket Example</Text>
      <Button title="Connect to Socket" onPress={connectToSocket} />
      <TextInput
        placeholder="Mount Point"
        value={mountPoint}
        onChangeText={(text) => setMountPoint(text)}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {/* You can remove the "Get Location" button if you want to send the location automatically */}
      <Button title="Send Message" 
      onPress={sendMessage} />

      {/* Your component UI here */}
    </View>
  );
};

export default NtripClientScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


