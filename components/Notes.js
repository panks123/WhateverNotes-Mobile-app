import React, { useContext, useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import noteContext from '../contexts/notes/NoteContext'
import Loading from './Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteItem from './NoteItem';

function Notes(props) {
    const context = useContext(noteContext)
    const { notes, fetchAllNotes, updateNote } = context
    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalNote, setModalNote] = useState(useState({ m_id: "", m_title: "", m_content: "", m_tag: "" }))

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

    const handleModalInputChange = (name, value) => {
        // console.log(`${name}:${value}`)
        setModalNote({ ...modalNote, [name]: value })
    }

    const handleModalUpdateBtnClick = () => {
        // console.log(modalNote)
        updateNote(modalNote.m_id, modalNote.m_title, modalNote.m_content, modalNote.m_tag)
        setShowModal(false)
        ToastAndroid.show('Successfully updated!!!', ToastAndroid.SHORT)
    }

    useEffect(() => {
        fetchAsyncStorage().then(() => {
            if (isloggedIn) {
                fetchAllNotes().then(() => {

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
            <Modal
                visible={showModal}
                transparent
                onRequestClose={() => {
                    setShowModal(false)
                }}
                animationType='slide'
                hardwareAccelerated
            >
                <View style={styles.centerd_modal}>
                    <View style={styles.modal__container}>
                        <View style={styles.modal__content}>
                            <Text style={styles.modal__header}>Edit Note</Text>
                            <TextInput
                                label="Note title"
                                mode='outlined'
                                value={modalNote.m_title}
                                onChangeText={(text) => handleModalInputChange('m_title', text)}
                            />
                            <TextInput
                                label="Note"
                                multiline
                                mode='outlined'
                                style={styles.input}
                                value={modalNote.m_content}
                                onChangeText={(text) => handleModalInputChange('m_content', text)}
                            />
                        </View>
                        <View style={styles.button_container}>
                            <Button
                                mode='contained'
                                style={styles.button__cancel}
                                onPress={() => { setShowModal(false) }}
                            >
                                Cancel
                            </Button>
                            <Button
                                mode='contained'
                                style={styles.button__update}
                                onPress={() => { handleModalUpdateBtnClick() }}
                            >
                                Update
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Text style={styles.note__container__header}> Your Notes:</Text>
            {loading ? <Loading /> :
                <>
                    <View style={styles.note__container}>
                        {
                            notes.length > 0 ? <>
                                {
                                    notes.map((note) => {
                                        return <NoteItem
                                            key={note._id}
                                            note={note}
                                            setShowModal={setShowModal}
                                            modalNote={modalNote}
                                            setModalNote={setModalNote}
                                        />
                                    })
                                }
                            </>
                                : <><Text style={{ textAlign: 'center' }}>No notes to show😢</Text></>
                        }
                    </View>
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    note__container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10
    },
    note__container__header: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    centerd_modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000099'
    },
    modal__container: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 7

    },
    modal__content: {
        width: '96%',
        marginHorizontal: 4
    },
    modal__header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingHorizontal: 7
    },
    input: {
        marginVertical: 5,
    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 6
    },
    button__cancel: {
        backgroundColor: '#ff4f4f',
    },
    button__update: {
        backgroundColor: '#047ec4'
    },
})


export default Notes;