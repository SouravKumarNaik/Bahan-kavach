import { View, Text, StyleSheet, TouchableOpacity, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapComponent from './Map';
import React, { useState, useEffect } from 'react';
import { Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { initializeApp } from 'firebase/app';
import { getFirestore,setDoc,doc } from 'firebase/firestore';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import firebase from 'firebase/app';

const Stack = createStackNavigator(); 
export default function App() {
   const[data,setData] = useState([]);
  const firebaseConfig = {
    apiKey: "AIzaSyB0pJMZ5BOqHKM9V6jswqqawwga4OQPV28",
    authDomain: "fir-dc608.firebaseapp.com",
    databaseURL: "https://fir-dc608-default-rtdb.firebaseio.com",
    projectId: "fir-dc608",
    storageBucket: "fir-dc608.appspot.com",
    messagingSenderId: "362096921282",
    appId: "1:362096921282:web:4fe7d6cbd889f3c226895b"
  }

  const location_database = initializeApp(firebaseConfig);
  
  const dataBase = getDatabase(location_database);
  const location = ref(dataBase, "Location");
  console.log(location);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [region, setRegion] = useState({
    latitude: 22.2535222,
    longitude: 84.9083016,
  });
  
  useEffect(() => {
    const locationRef = ref(getDatabase(location_database), 'Location');

    onValue(locationRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setRegion({latitude,longitude})
        }
    });
}, [latitude]);
console.log(latitude);


  const [errorMsg, setErrorMsg] = useState(null);

  const handleLocationError = (browserHasGeolocation) => {
    setErrorMsg(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your device or app does not support geolocation.'
    );
  };

  const handleLocationButtonPress = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setRegion({
          ...region,
          ...pos,
        });
      },
      () => {
        handleLocationError(true);
      }
    );
  };

  // useEffect(() => {
  //   // You may initialize the map here if needed
  // }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Current Location" />
      </MapView>

      <View style={styles.buttonContainer}>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    top: 16,
    left: 8,
    right: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
  },
});

