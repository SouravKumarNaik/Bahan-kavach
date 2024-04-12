import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Dimensions } from 'react-native';
// import { View, Text, StyleSheet, TouchableOpacity, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapComponent from './Map';
import  { useState, useEffect } from 'react';
import { Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { initializeApp } from 'firebase/app';
import { getFirestore,setDoc,doc } from 'firebase/firestore';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import firebase from 'firebase/app';
// import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator(); 
const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.navBarText}>Bahan-Kavach</Text>
    </View>
  );
};

const MapSection = () => {

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
}, [latitude,longitude]);
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

  return (
        <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Current Location" />
      </MapView>

      <View style={styles.buttonContainer}>
      </View> 
    </View>
  );
};


const HistorySection = () => {
    const [coordinates, setCoordinates] = useState([]);
  return (
    <View style={styles.section}>
      {/* Your history component goes here */}
      <Text>History Section</Text>
    </View>
  );
};

const Begin = () => {
  const scrollViewRef = useRef(null);

  const scrollToMap = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const scrollToHistory = () => {
    scrollViewRef.current.scrollTo({ x: 1 * screenWidth, y: 0, animated: true });
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.containerr}>
      <NavBar />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width: screenWidth }}>
          <MapSection />
        </View>
        <View style={{ width: screenWidth }}>
          <HistorySection />
        </View>
      </ScrollView>
      <View style={styles.buttonContainerr}>
        <TouchableOpacity onPress={scrollToMap} style={styles.button}>
        {/* <Icon name="map" size={30} color="#fff" /> */}
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollToHistory} style={styles.button}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
  },
  section:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    backgroundColor: '#006d77', // Change color as needed
    padding: 10,
    paddingTop:45,
    alignItems: 'center',
  },
  navBarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainerr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#006d77',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: '#007bff',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
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

export default Begin;
