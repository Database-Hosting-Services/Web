// sqlEditorConfig.js

import { EditorView } from "@codemirror/view";
import { sql } from "@codemirror/lang-sql";

// Theme for EditorView (UI styling)
export const myCustomTheme = EditorView.theme({
  "&": {
    backgroundColor: "#191A30",
    color: "#FFFFFF",
    height: "100%",
  },
  ".cm-content": {
    fontSize: "16px",
    fontFamily: "'Fira Code', 'Roboto Mono', monospace",
  },
  ".cm-cursor": {
    borderLeft: "2px solid #FFFFFF",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection":
    {
      backgroundColor: "#06071A",
      color: "#FFFFFF",
    },
  ".cm-activeLine": {
    backgroundColor: "#1F213F",
  },
  ".cm-gutters": {
    backgroundColor: "#191A30",
    color: "#8A8FA3",
    border: "none",
  },
});

// Full extension bundle for CodeMirror setup
export const sqlEditorExtensions = [
  sql(),
  myCustomTheme, // لا يزال يتم تطبيق استايل الـ theme فقط
];
