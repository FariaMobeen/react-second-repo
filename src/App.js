import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main.js";
import Sidebar from "./Sidebar.js";

function App() {
  // Use state hooks to manage notes and active note
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const [readOnly, setReadOnly] = useState(false); // add state for read-only

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
    const index = notes.findIndex(({ id }) => id === noteId);
    if (index !== -1) {
      const shouldDelete = window.confirm("Are you sure you want to delete this note?");
      if (shouldDelete) {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
  
        localStorage.setItem("notes", JSON.stringify(newNotes));
  
        if (newNotes.length === 0) {
          setActiveNote(false);
        } else {
          const nextIndex = index === 0 ? 0 : index - 1;
          setActiveNote(newNotes[nextIndex].id);
        }
      }
    }
  };
  
  const onSaveNote = () => {
    var button = document.getElementById("save-Button");
    if (button.innerHTML === "Edit") {
      button.innerHTML = "Save";
    document.getElementsByClassName("ql-toolbar")[0].style.display= "block";
    setReadOnly(false);

    } else {
      button.innerHTML = "Edit";
      document.getElementsByClassName("ql-toolbar")[0].style.display= "none";
      setReadOnly(true);

      //document.getElementById("ql-editor").disable();
    }

    
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
  //const elem = document.getElementsByClassName("app-main-note-edit");
  //elem.requestFullscreen();
  // Function to update a note's fields
  
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
    setReadOnly(false);

  };



  const fullscreen = () => {
    const appMain = document.querySelector('.app-main');
    const sidebar = document.querySelector('.app-sidebar');
    const isFullscreen = appMain.classList.contains('fullscreen');
  
    if (isFullscreen) {
      appMain.classList.remove('fullscreen');
      sidebar.style.display = 'block';
    } else {
      appMain.classList.add('fullscreen');
      sidebar.style.display = 'none';
    }
  };
  




  // Function to get the active note from the notes array
  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  // Render the app
  return (
    
    <div className="App">
    


<p id="message"></p>
  <header>
    <h1>Lotion</h1>
    <p>Like Notion, but worse</p>
    <button id="full-screen" onClick={() => fullscreen()}
 style={{ float: "left", fontSize: "40px" }}>
  &#8801;
</button></header>

      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        onDeleteNote={onDeleteNote}
        onSaveNote={onSaveNote}
        className="app-sidebar"
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
        onSaveNote={onSaveNote}
        readOnly = {readOnly}
      />
    </div>
  );
}

export default App;
