
import './App.css';
import React, {useState} from "react";
import ReactQuill from "react-quill";
import "../node_modules/react-quill/dist/quill.snow.css";

function App() {
  const [noteTitle, setNoteTitle] = useState("Untitled");

  const [body,setBody] = useState("");
  const handleBody = e =>{
    console.log(e);
    setBody(e);
  }
  return (
    <div>
      <header>
        <h1>Lotion</h1>
     <p>Like Notion, but worse</p>
      </header>
      <div className="App">
        <div className="editor-container">
        <div className="editor-header">
        <input
  type="text"
  placeholder="Enter note title"
  value={noteTitle}
  onChange={(e) => setNoteTitle(e.target.value)}
  className="note-title-input"
/>


</div>
          <ReactQuill
            placeholder="Your note here"
            modules={App.modules}
            formats={App.formats}
            onChange={handleBody}
            value={body}
            className="my-quill-editor"
          />
        </div>
        <div className="sidebar">
          <p><strong>Notes</strong></p>
        </div>
      </div>
    </div>
  );
}
App.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

App.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default App;
