import NoteContext from "./NoteContext";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteState = (props) => {
    const host = 'http://157.230.176.26:5000'

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    const fetchAuthToken = async () => {
        let token = '';
        try {
            token = await AsyncStorage.getItem('token')
        }
        catch (e) {
            console.log(e)
        }
        // console.log("Token",token)
        return token;
    }

    // Fetch All Notes
    const fetchAllNotes = async () => {
        // API call for adding note to DB

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": await fetchAuthToken()
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    // Add a note
    const addNote = async (title, content, tag) => {
        // API call for adding note to DB
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": await fetchAuthToken()
            },
            body: JSON.stringify({ title, content, tag })
        });
        const note = await response.json(); // The added note will be returned by the backend
        setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = async (id) => {
        // API call for deleting the note from DB
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "auth-token": await fetchAuthToken()
            }
        });

        let newNotes = notes;

        if (response.status === 200) {
            newNotes = notes.filter((note) => {
                return note._id !== id
            })
        }
        setNotes(newNotes)
    }

    // Update a note
    const updateNote = async (id, title, content, tag)=>{
        // API call for updating the note in DB
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": await fetchAuthToken()
          },
          body: JSON.stringify({title, content, tag})
        });
  
        // creating a deep copy of 'notes'
        let newNotes = JSON.parse(JSON.stringify(notes))
  
        // Logic to edit in client side
        if(response.status === 200)
        {
          for(let element of newNotes)
          {
            if(element._id === id)
            {
              element.title = title
              element.content = content
              element.tag = tag;
              break;
            }
          }
        }
        setNotes(newNotes);
      }

    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;