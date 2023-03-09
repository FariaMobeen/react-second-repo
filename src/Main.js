import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../node_modules/react-quill/dist/quill.snow.css";
import DatePicker from "./datepicker";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Header component with title input, datepicker and save/delete buttons
const EditorHeader = ({ activeNote, onEditField, onDeleteNote,onSaveNote,onnoedit  }) => {
  
    const [previewVisible, setPreviewVisible] = useState(false);

  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
    var button = document.getElementById("save-Button");
    if (button.value === "Save") {
      button.value = "Edit";
    } else {
      button.value = "Save";}
};
const [readOnly, setReadOnly] = useState(false); // add state for read-only

  const disabletitleonsave = () => {
    setReadOnly((prevReadOnly) => !prevReadOnly);
  }
  const [readOnlyDate, setReadOnlyDate] = useState(false); // add state for read-only
  const disabledatepickeronsave = () => {
    setReadOnlyDate((prevReadOnly) => !prevReadOnly);
  }
  
const titleHeader =(<input
  type="text"
  id="title"
  placeholder="Note Title"
  value={activeNote.title}
  onChange={(e) => onEditField("title", e.target.value)}
  autoFocus
  style={{ fontSize: "12px" }}
  readOnly={readOnly} // Add this line
  />)

  const datepicker =(
<DatePicker
readOnly={readOnlyDate}

/>

  );
  
    return (
    <div className="editor-header">
      <div className="header-wrapper">
        <div className="title-wrapper title-input">
         {titleHeader}
        </div>
       

        <button onClick={() => onDeleteNote(activeNote.id)} style={{ float: "right" }}>
            Delete
          </button>
          <button id="save-Button" onClick={() => {
          onSaveNote();
          onnoedit();
          disabletitleonsave();
          disabledatepickeronsave()
        }} style={{ float: "right" }}>
            Save 
        </button>

        <div className="datepicker-wrapper calendar-input">
        {datepicker}
        </div>
        <div>
          {/* Preview component */}
         

    </div>
          
        </div>
      </div>
    
  );
};

// Main component with editor and save status display
const Main = ({ activeNote, onUpdateNote, onDeleteNote, onSaveNote
 }) => {
  const [readOnly, setReadOnly] = useState(false); // add state for read-only

  const onnoedit = () => {
    setReadOnly((prevReadOnly) => !prevReadOnly);
  }
  
  // Function to update a field in the note object
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  

  
  // If there is no active note, display a message
  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const quillComponent = (
    <ReactQuill
      name="body"
      id="body"
      placeholder="Write your note here..."
      modules={Main.modules}
      formats={Main.formats}
      value={activeNote.body}
      onChange={(content, delta, source, editor) => {
        onEditField("body", editor.getHTML());
      }}
          readOnly={readOnly} // Add this line

      className="my-quill-editor"
    />
  );
  
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {/* Header component */}
        <EditorHeader
          activeNote={activeNote}
          onEditField={onEditField}
          onDeleteNote={onDeleteNote}
          onSaveNote = {onSaveNote}
          onnoedit={onnoedit}
        />
{quillComponent}

       
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


