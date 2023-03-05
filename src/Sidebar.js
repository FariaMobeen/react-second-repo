// Define the Sidebar component
const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    // Sort the notes array by last modified date, in descending order
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    // Render the component's JSX
    return (
      <div className="app-sidebar">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
  
        {/* Render the header */}
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button onClick={onAddNote}>
            <span><i className="fas fa-plus"></i></span>
          </button>
        </div>
  
        {/* Render the list of notes */}
        <div className="app-sidebar-notes">
          {notes.length === 0 ? (
            <div className="no-notes">No notes yet</div>
          ) : (
            sortedNotes.map(({ id, title, body, lastModified }, i) => (
              <div
                className={`app-sidebar-note ${id === activeNote && "active"}`}
                onClick={() => setActiveNote(id)}
              >
                <div className="sidebar-note-title">
                  <strong>{title}</strong>
                  

                </div>
  
                <p>{body && body.substr(0, 100) + "..."}</p>
                <small className="note-meta">
                  Last Modified{" "}
                  {new Date(lastModified).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  // Export the Sidebar component as the default export
  export default Sidebar;
  