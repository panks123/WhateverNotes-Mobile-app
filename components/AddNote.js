import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, ToastAndroid, Alert, Modal } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import noteContext from '../contexts/notes/NoteContext'
import AntDesign from '@expo/vector-icons/AntDesign'

const AddNote = (props) => {

    const [note, setNote] = useState({ title: "", content: "", tag: "" })

    const context = useContext(noteContext)
    const { addNote } = context

    const { showAddNote, setShowAddNote } = props

    const handleChange = (name, value) => {
        // console.log(`${name}:${value}`)
        setNote({ ...note, [name]: value })
    }

    const handleAddNoteBtnClick = () => {
        // console.log(note)
        if (note.title.length < 1) {
            Alert.alert('Failed', 'Note title should not be empty', [{ text: 'OK' }])
        }
        else if (note.content.length < 1) {
            Alert.alert('Failed', 'Note content should not be empty', [{ text: 'OK' }])
        }
        else {
            addNote(note.title, note.content, note.tag)
            setNote({ title: "", content: "", tag: "" })
            ToastAndroid.show('Note was added successfully!', ToastAndroid.SHORT)
            setShowAddNote(false)
        }
    }

    return (
        <>
            <Modal
                visible={showAddNote}
                transparent
                onRequestClose={() => {
                    setShowAddNote(false)
                }}
                animationType='slide'
                hardwareAccelerated
            >
                <View style={styles.centerd_modal}>
                    <View style={styles.modal__container}>
                        <View style={styles.modal__content}>
                            <Text style={styles.modal__header}>Add a Note</Text>
                            <TextInput
                                label="Note title"
                                mode='outlined'
                                style={styles.input}
                                value={note.title}
                                onChangeText={(text) => handleChange('title', text)}
                            />
                            <TextInput
                                label="Note"
                                multiline
                                mode='outlined'
                                style={styles.input}
                                value={note.content}
                                onChangeText={(text) => handleChange('content', text)}
                            />
                            <View style={styles.button_container}>
                                <Button onPress={() => { setShowAddNote(false) }} ><AntDesign name='closecircleo' size={18} onPress={() => { setShowAddNote(false) }} /> Close</Button>
                                <Button mode='contained' onPress={() => { handleAddNoteBtnClick() }} ><AntDesign name='pluscircleo' size={18} onPress={() => { handleAddNoteBtnClick() }} /> Add</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </>

    )
}

const styles = StyleSheet.create({
    box: {
        marginHorizontal: 10,
        marginVertical: 7,
        padding: 5,
        borderWidth: 1,
        borderColor: '#211',
        borderRadius: 7,
        width: '95%',
    },
    boxHeader: {
        fontWeight: 'bold'
    },
    input: {
        marginVertical: 5,
    },
    button__add: {
        width: '40%'
    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 6
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
})

export default AddNote
