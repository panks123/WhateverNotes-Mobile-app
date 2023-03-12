import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, ToastAndroid } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import noteContext from '../contexts/notes/NoteContext'

const AddNote = () => {

    const [note, setNote] = useState({ title: "", content: "", tag:"" })

    const context = useContext(noteContext)
    const { addNote } = context

    const handleChange = (name, value) => {
        // console.log(`${name}:${value}`)
        setNote({ ...note, [name]: value })
    }

    const handleAddNoteBtnClick =()=>{
        // console.log(note)
        addNote(note.title, note.content, note.tag)
        setNote({ title: "", content: "", tag: "" })
        ToastAndroid.show('Note was added successfully!', ToastAndroid.SHORT)
    }

    return (
        <View style={styles.box}>
            {/* <Text style={styles.boxHeader}>Add a note</Text> */}
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
            <View>
                <Button
                    mode='contained'
                    style={styles.button__add}
                    onPress={() => { handleAddNoteBtnClick() }}
                >
                    Add note
                </Button>
            </View>
        </View>
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
})

export default AddNote
