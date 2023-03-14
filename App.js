import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomStatusBar from './components/CustomStatusBar';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isloggedIn, setIsLoggedIn] = useState(false)

  const fetchAsyncStorage = async ()=>{
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        // if token was previously stored
        setIsLoggedIn(true)
      }
      else {
        // if token was not previously stored
        setIsLoggedIn(false)
      }
    } catch (e) {
      // error reading token
      setIsLoggedIn(false)
    }
  }

  useEffect( () => {
    fetchAsyncStorage()
  }, [])
  return (
    <>
    <CustomStatusBar/>
    <View style={styles.header}>
      <Text style={styles.headerText}>WhateverNotes</Text>
    </View>
    
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {
          isloggedIn ? (
            <>
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="signup" component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="signup" component={SignupScreen} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor: "#61daab",
    paddingVertical: 10,
    marginTop: 35
},
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10
},
})
