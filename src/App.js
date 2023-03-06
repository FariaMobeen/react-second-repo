import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main.js";
import Sidebar from "./Sidebar.js";

function App() {
  // Use state hooks to manage notes and active note
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  // Load saved notes from local storage when the app loads
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Function to add a new note
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };

    // Add new note to the beginning of the notes array
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  // Function to delete a note
  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
    localStorage.setItem(
      "notes",
      JSON.stringify(notes.filter(({ id }) => id !== noteId))
    );
  };

  const onSaveNote = () => {
    const activeNote = getActiveNote();

    // Retrieve the saved notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // Find the index of the active note in the saved notes array
    const activeNoteIndex = savedNotes.findIndex(
      (note) => note.id === activeNote.id
    );

    if (activeNoteIndex >= 0) {
      // If the active note is already in the saved notes array, update it
      savedNotes[activeNoteIndex] = activeNote;
    } else {
      // If the active note is not in the saved notes array, add it
      savedNotes.push(activeNote);
    }

    // Save the updated notes array back to local storage
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    // Update the notes state with the active note
    setNotes(savedNotes);
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
        onSaveNote={onSaveNote}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
        onSaveNote={onSaveNote}
      />
    </div>
  );
}

export default App;
