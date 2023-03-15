import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, ToastAndroid } from "react-native";
import { Button, Text } from "react-native-paper";
import Notes from "../components/Notes";
import NoteState from "../contexts/notes/NoteState";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNote from "../components/AddNote";
import TopBar from "../components/TopBar";

export default function HomeScreen(props) {

    const [showAddNote, setShowAddNote] = useState(false)

    const handleLogout = () => {
        // console.log("Logout button clicked")
        AsyncStorage.removeItem('token').then(() => {
            ToastAndroid.show("Successfully logged out!", ToastAndroid.SHORT)
            props.navigation.replace('login')
        })
    }

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <NoteState>
                        <View style={styles.box}>
                            <TopBar handleLogout = {handleLogout} setShowAddNote = { setShowAddNote}/>
                            {
                                showAddNote ? <AddNote showAddNote = {showAddNote} setShowAddNote= {setShowAddNote}/> : <></>
                            }
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
