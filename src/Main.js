import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";
import "../node_modules/react-quill/dist/quill.snow.css";
import DatePicker from "./datepicker";

const EditorHeader = ({ activeNote, onEditField }) => {
  return (
    <div className="editor-header">
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
      <div className="datepicker-wrapper calendar-input">
  <DatePicker />
</div>
    </div>
  );
};

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <EditorHeader activeNote={activeNote} onEditField={onEditField} />
        <ReactQuill
          placeholder="Write your note here..."
          modules={Main.modules}
          formats={Main.formats}
          value={activeNote.body}
          onChange={(value) => onEditField("body", value)}
          className="my-quill-editor"
        />
      </div>
    </div>
  );
};

Main.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

Main.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default Main;
