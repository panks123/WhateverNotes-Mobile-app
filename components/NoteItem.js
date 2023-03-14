import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ToastAndroid, Alert } from 'react-native'
import { Button, Badge } from 'react-native-paper';
import noteContext from '../contexts/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;

    const { note, setShowModal, modalNote, setModalNote } = props

    const formattedTimeStamp = (date) => {
        let dat = new Date(date)
        return dat.toLocaleString('default', { month: 'short' }) + " " + dat.getDate() + ", " + dat.getFullYear()
    }

    const handleDelete = (id) => {
        Alert.alert('Alert', "Are you sure to delete this note?", [
            {
                text: 'Cancel',
                onPress: () => {
                    // console.log("Cancelled delete")
                },
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    deleteNote(id);
                    ToastAndroid.show('Deleted successfully!', ToastAndroid.SHORT)
                }
            }
        ],
            {
                cancelable: true,
                onDismiss: () => {
                    // console.log("Alert was dismissed by clicking outside the Alert box")
                }
            },
        )
    }

    const updateModalContent = async (currentNote)=>{
        setModalNote({...modalNote, m_id: currentNote._id, m_title: currentNote.title, m_content: currentNote.content, m_tag: currentNote.tag})
    }

    const handleUpdateBtnClick = async (currentNote) => {
        await updateModalContent(currentNote)
        // write code to open the modal and pass the values of modalNote state to the modal input elements
        setShowModal(true)
    }

    return (
        <View style={styles.card}>
            <Badge
                value={'Hello'}
                style={styles.badge}
            >{formattedTimeStamp(note.timestamp)}</Badge>
            <Text style={styles.card__title}> {note.title}</Text>
            <Text style={styles.card__content}> {note.content}</Text>
            <View style={styles.button_container}>
                <Button
                    mode='contained'
                    style={styles.button__delete}
                    onPress={() => { handleDelete(note._id) }}
                >
                    Delete
                </Button>
                <Button
                    mode='contained'
                    style={styles.button__update}
                    onPress={() => { handleUpdateBtnClick(note) }}
                >
                    Update
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fced',
        marginVertical: 10,
        marginHorizontal: 17,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    card__title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6
    },
    card__content: {

    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 6
    },
    button__delete: {
        backgroundColor: '#ff4f4f',
    },
    button__update: {
        backgroundColor: '#047ec4'
    },
    badge: {
        position: 'absolute',
        right: 14,
        top: -8,
        paddingHorizontal: 5,
        backgroundColor: '#9c7976'
    }
})



export default NoteItem
