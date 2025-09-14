import React, { useMemo } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ value, onChange }) => {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your content here...",
      height: 400,
      spellcheck: true,
      language: "en",
      theme: "default", // switched to light theme
      saveModeInCookie: false,
      toolbarAdaptive: false, // keeps toolbar consistent
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "link",
        "table",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "symbol",
        "fullsize",
        "print",
        "about",
      ],
    }),
    [],
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor="content"
        className="block text-sm font-medium text-gray-700"
      >
        Content <span className="text-red-500">*</span>
      </label>
      <div className=" rounded-none overflow-hidden">
        <JoditEditor
          value={value}
          config={config}
          onBlur={(newContent) => onChange(newContent)}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
