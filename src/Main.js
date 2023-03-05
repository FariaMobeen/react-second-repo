import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../node_modules/react-quill/dist/quill.snow.css";
import DatePicker from "./datepicker";

// Header component with title input, datepicker and save/delete buttons
const EditorHeader = ({ activeNote, onEditField, onDeleteNote,onSaveNote }) => {
  return (
    <div className="editor-header">
      <div className="header-wrapper">
        <div className="title-wrapper title-input">
          <input
            type="text"
            id="title"
            placeholder="Note Title"
            value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)}
            autoFocus
            style={{ fontSize: "12px" }}
          />
        </div>
        <button onClick={() => onSaveNote(activeNote.id)} style={{ float: "left" }}>
            Save
          </button>
        <button onClick={() => onDeleteNote(activeNote.id)} style={{ float: "right" }}>
            Delete
          </button>
        <div className="datepicker-wrapper calendar-input">
          <DatePicker />
        </div>
        <div>
          
          
        </div>
      </div>
    </div>
  );
};

// Main component with editor and save status display
const Main = ({ activeNote, onUpdateNote, onDeleteNote, onSaveNote
 }) => {
 
  // Function to update a field in the note object
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  // Function to handle save button click


  // If there is no active note, display a message
  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {/* Header component */}
        <EditorHeader
          activeNote={activeNote}
          onEditField={onEditField}
          onDeleteNote={onDeleteNote}
          onSaveNote = {onSaveNote}
      
        />
        {/* Editor component */}
         {/* replacing text area with react quill causes the issue of not saving automatically
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      */}
       
       <ReactQuill
  name="body"
  id="body"
  placeholder="Write your note here..."
  modules={Main.modules}
  formats={Main.formats}
  value={activeNote.body}
  //onChange={(content, delta, source, editor) => {onEditField("body", editor.getHTML());}}
  className="my-quill-editor"
/>

       
      </div>
    </div>
  );
};

// Quill editor modules and formats
Main.modules = {
  toolbar: [
    { header: "1" },
    { header: "2" },
    { font: [] },
    { size: [] },
    "bold",
    "italic",
    "underline",
    "strike",
    { list: "ordered" },
    { list: "bullet" },
    { indent: "-1" },
    { indent: "+1" },
    "link",
    "image",
    "video",
    "clean",
  ],
};
Main.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default Main;
