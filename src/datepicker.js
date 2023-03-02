import React, { useState } from "react";
import "./App.css";
function DatePicker() {
  const [dateTime, setDateTime] = useState("");

  console.log("DateTime", dateTime);

  return (
    <>
      
      <input
  type="datetime-local"
  step="1"
  onChange={(e) => setDateTime(e.target.value)}
  style={{ fontSize: "12px" }}
/>

    </>
  );
}

export default DatePicker;
