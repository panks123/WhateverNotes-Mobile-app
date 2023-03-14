import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Alert, ToastAndroid } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen(props) {

    const [credentials, setCredentials] = useState({ email: "", password: ""})

    const handleChange = (name, value)=>{
        // console.log(`${name}:${value}`)
        setCredentials({...credentials, [name]: value})
    }

    const handleLogIn = async ()=>{
        // console.log("Email: ",credentials.email)
        // console.log("Password: ",credentials.password)
        
        const url = 'http://157.230.176.26:5000/api/auth/login'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });

          const json = await response.json()
        //   console.log(json)
          if(json.success)
          {
            // store the token in async-storage
            try {
                await AsyncStorage.setItem('token', json.authToken)
                await AsyncStorage.setItem('username', json.username)
                await AsyncStorage.setItem('useremail', json.email)
                // Alert.alert('Success', 'Token was successfully stored!', [ {text: 'OK'}]) // temporary line
                ToastAndroid.show('Successfully logged in!!!', ToastAndroid.SHORT)
                props.navigation.replace('home')
            } catch (e) {
                Alert.alert('Failed', 'Something wrong happened 😢\n\nPlease try again', [ {text: 'OK'}])
                
            }
          }
          else
          {
            Alert.alert('Login Failed', 'Incorrect credentials😢', [ {text: 'OK'}])
          }
    }

    return (
        <>
            <KeyboardAvoidingView behavior='position'>
                {/* <View style={styles.header}>
                    <Text style={styles.headerText}>WhateverNotes</Text>
                </View> */}
                <View style={[styles.container, styles.elevation]}>
                    <View style={styles.box}>
                        <Text style={styles.boxHeader}>Please login to proceed</Text>
                        <TextInput
                            label="Email"
                            mode='outlined'
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoCompleteType='email'
                            value={credentials.email}
                            onChangeText = {(text) => handleChange('email', text)}
                        />
                        <TextInput
                            label="Password"
                            mode='outlined'
                            style={styles.input}
                            secureTextEntry={true}
                            onChange = {handleChange}
                            onChangeText = {(text) => handleChange('password', text)}
                        />
                        <View style={{ marginVertical: 6 }}>
                            <Button mode="contained" onPress={()=> { handleLogIn() }}>
                                Log in
                            </Button>
                        </View>

                        <Text>Don't have an account?
                            <TouchableOpacity 
                            style={{ backgroundColor: '#61daab', paddingHorizontal: 2, marginHorizontal: 10, paddingVertical: 2, borderRadius: 5 }}
                            onPress={()=>{
                                // console.log("Pressed - signup button")
                                props.navigation.navigate('signup')
                            }}
                            >
                                <Text>Signup</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        margin: 10,
        padding: 12,
        width: '90%',
        borderWidth: 1,
        borderColor: '#111',
        borderRadius: 7
    },

    elevation: {
        elevation: 20,
        shadowColor: '#61daab',
    },

    boxHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 7
    },
    input: {
        marginVertical: 5,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,

    },
})

