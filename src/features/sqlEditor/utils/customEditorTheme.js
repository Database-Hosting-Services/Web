import { EditorView } from "@codemirror/view";

const customEditorTheme = EditorView.theme({
  ".cm-gutters": {
    backgroundColor: "#191a30",
    color: "#FFFFFF",
    border: "none",
  },
  ".cm-lineNumbers": {
    color: "#FFFFFF",
    fontSize: "18px",
    backgroundColor: "#191a30",
  },
  ".cm-content": {
    caretColor: "#ffffff",
  },
  ".cm-cursor": {
    borderLeft: "1px solid #ffffff",
  },
});

export default customEditorTheme;
