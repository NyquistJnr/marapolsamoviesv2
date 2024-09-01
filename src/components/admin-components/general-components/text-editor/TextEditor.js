// components/RichTextEditor.js

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value || "Start writing...");

  const handleChange = (content) => {
    setEditorValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <ReactQuill
      value={editorValue}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      theme="snow"
      style={{ height: "400px" }}
    />
  );
};

// Quill modules for toolbar configuration
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"], // Removes all formatting
  ],
};

// Supported formats for the editor
const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
];

export default RichTextEditor;
