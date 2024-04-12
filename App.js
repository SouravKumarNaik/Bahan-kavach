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

import Begin from './Begin';


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Stack = createStackNavigator(); 
export default function App() {
  return (
    <Begin/>
  );
}



