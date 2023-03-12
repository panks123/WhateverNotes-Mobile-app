import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, ToastAndroid } from "react-native";
import { Button, Text } from "react-native-paper";
import Notes from "../components/Notes";
import NoteState from "../contexts/notes/NoteState";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNote from "../components/AddNote";

export default function HomeScreen(props) {

    const [userDetails, setUserDetails] = useState({ name: "", email: "" })

    const handleLogout = () => {
        // console.log("Logout button clicked")
        AsyncStorage.removeItem('token').then(() => {
            ToastAndroid.show("Successfully logged out!", ToastAndroid.SHORT)
            props.navigation.replace('login')
        })
    }
    const fetchUserDatails = async () => {
        try {
            const name = await AsyncStorage.getItem('username')
            const email = await AsyncStorage.getItem('useremail')
            setUserDetails({ name: name, email: email })
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUserDatails()
    }, [])

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <NoteState>
                        <View style={styles.box}>
                            {/* <Text>Hello 🎉</Text>
                            <Text>Logged in as: </Text>
                            <Text>Name : {userDetails.name}</Text>
                            <Text>Email : {userDetails.email}</Text> */}
                            <AddNote/>
                            <Button
                                mode="contained"
                                onPress={() => {
                                    handleLogout()
                                }}
                            >
                                Log out
                            </Button>
                        </View>

                        <Notes />
                    </NoteState>
                </ScrollView>
            </SafeAreaView>
        </>

    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
