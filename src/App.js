import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main.js";
import Sidebar from "./Sidebar.js";

function App() {
  // Use state hooks to manage notes and active note
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  // Save notes to local storage whenever notes state changes
 // useEffect(() => {
   // localStorage.setItem("notes", JSON.stringify(notes));
  //}, [notes]);

  // Function to add a new note
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
     // lastModified: Date.now(),
    };
    console.log(newNote);
    // Add new note to the beginning of the notes array
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  // Function to delete a note

  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are you sure you want to delete your note?");
    if(answer){
    setNotes(notes.filter(({ id }) => id !== noteId));}
  };


  const onSaveNote = (noteId) => {
    // save the note with the given id
    // ...
  };
  
  // Function to update a note's fields
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  // Function to get the active note from the notes array
  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  // Render the app
  return (
    <div className="App">
      <header>
        <h1>Lotion</h1>
        <p>Like Notion, but worse</p>
      </header>
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        onDeleteNote={onDeleteNote}
        onSaveNote = {onSaveNote}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
        onSaveNote = {onSaveNote}
      />
    </div>
  );
}

export default App;
