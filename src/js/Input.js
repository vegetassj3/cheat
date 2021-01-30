import React, { useState } from "react";
export default function input() {
  const [url, setUrl] = useState("");

  return (
    <div className="wrapper">
      <label htmlFor="url">Enter URL:</label>
      <input
        type="text"
        id="url"
        value={url}
        name="url"
        autoComplete="off"
        placeholder="Your URL..."
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />

      <button
        type="button"
        onClick={() => {
          electron.windowAPI.sendUrl(url);
          electron.windowAPI.closeInputWindow();
          console.log();
        }}
      >
        Add URL
      </button>
      <button
        type="button"
        className="cancel"
        onClick={() => {
          electron.windowAPI.closeInputWindow();
        }}
      >
        Cancel
      </button>
    </div>
  );
}
