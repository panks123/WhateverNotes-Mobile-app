import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';

export default CustomStatusBar =()=> {
    return (
        <StatusBar
        animated={true}
        backgroundColor="#61daab"
        barStyle="light-content"
      />
    )
}