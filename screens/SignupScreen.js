import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Alert, ToastAndroid } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function SignupScreen(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword:""})

    const handleChange = (name, value)=>{
        // console.log(`${name}:${value}`)
        setCredentials({...credentials, [name]: value})
    }

    const handleSignup = async ()=>{
        const url = 'http://157.230.176.26:5000/api/auth/createuser'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })

        const json = await response.json();
        // console.log(json)
        if (json.success)
        {
            ToastAndroid.show('Your account was successfully created.\n Please login now', ToastAndroid.LONG)
            // navigate to login page
            props.navigation.replace('login')
        }
        else
        {
            const err = String(json.error)
            // console.log(err)
            const errmsg = `Something wrong happened 😢\n\nMessage: ${err}`
            Alert.alert('Failed', errmsg , [ {text: 'OK'}])
        }
    }

    return (
        <>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>WhateverNotes</Text>
            </View> */}
            <KeyboardAvoidingView behavior='height'>
                <View style={[styles.container, styles.elevation]}>
                    <View style={styles.box}>
                        <Text style={styles.boxHeader}>Create an account</Text>
                        <TextInput
                            label="Name"
                            mode='outlined'
                            style={styles.input}
                            value={credentials.name}
                            onChangeText = {(text) => handleChange('name', text)}
                        />
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
                            value={credentials.password}
                            onChange = {handleChange}
                            onChangeText = {(text) => handleChange('password', text)}
                        />
                        <TextInput
                            label="Confirm passowrd"
                            mode='outlined'
                            style={styles.input}
                            secureTextEntry={true}
                            value={credentials.cpassword}
                            onChangeText = {(text) => handleChange('cpassword', text)}
                        />

                        { credentials.cpassword !== '' ? credentials.cpassword === credentials.password ? <></> : <View style={styles.cpassword_warning}>
                            <Text>Password and confirm password must match</Text>
                        </View> : <></>
                        }
                        <View style={{ marginVertical: 6 }}>
                            <Button mode="contained" onPress={()=> { handleSignup() }}>
                                Sign up
                            </Button>
                        </View>

                        <Text>Already have an account?
                            <TouchableOpacity
                                style={{ backgroundColor: '#61daab', paddingHorizontal: 4, paddingVertical: 2, marginLeft: 4, borderRadius: 5 }}
                                onPress={() => {
                                    // console.log("Pressed - login button")
                                    props.navigation.navigate('login')
                                }}
                            >
                                <Text>Login</Text>
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
    cpassword_warning: {
        backgroundColor: '#fa5757',
        paddingHorizontal: 4,
        paddingVertical:1,
        borderRadius: 4
    }
})

