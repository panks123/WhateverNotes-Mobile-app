import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import noteContext from '../contexts/notes/NoteContext'
import Loading from './Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteItem from './NoteItem';

function Notes(props) {
    const context = useContext(noteContext)
    const { notes, fetchAllNotes } = context
    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchAsyncStorage = async () => {
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

    useEffect(() => {
        fetchAsyncStorage().then(() => {
            if (isloggedIn) {
                fetchAllNotes().then(()=>{

                    setLoading(false)
                })
                // console.log("Notes recieved: ",notes)
            }
            else {
                // props.navigation.replace('login')
            }
        })
        // eslint-disable-next-line
    }, [isloggedIn])

    return (
        <>
            {loading ? <Loading/> :
            <>
                <Text style= {styles.note__container__header}> Your Notes:</Text>
                <View style={styles.note__container}>
                    {
                        notes.length > 0 ? <>
                            
                            {
                                notes.map((note) => {
                                    return <NoteItem key={note._id} note = {note} />
                                })
                            }
                        </>
                            : <><Text style={{textAlign: 'center'}}>No notes to Show😢</Text></>
                    }
                </View>
            </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    note__container : {
        flex:1,
        justifyContent: 'center',
        // backgroundColor: '#cafced',
        marginTop: 10
    },
    note__container__header: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})


export default Notes;