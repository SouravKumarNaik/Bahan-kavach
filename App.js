import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapComponent from './Map';
import React, { useState, useEffect } from 'react';
import { Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Stack = createStackNavigator(); 
export default function App() {
  const [region, setRegion] = useState({
    latitude: 22.2535221,
    longitude: 84.9083016,
  });

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

  useEffect(() => {
    // You may initialize the map here if needed
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Current Location" />
      </MapView>

      <View style={styles.buttonContainer}>
      </View>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
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

