const Sidebar = ({
    notes,           // array of notes to display
    onAddNote,       // function to add a new note
    onDeleteNote,    // function to delete a note
    activeNote,      // ID of the currently active note
    setActiveNote,   // function to set the active note
  }) => {
    // sort the notes by lastModified date, most recent first
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button onClick={onAddNote}>+</button>
        </div>
        <div className="app-sidebar-notes">
          {/* map over the sorted notes and create a div for each one */}
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
              key={id} // add a unique key for each note
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
              </div>
              <small className="note-meta">
                {/* format the lastModified date */}
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  