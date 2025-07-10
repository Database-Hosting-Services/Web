import { sql } from "@codemirror/lang-sql";
import CodeMirror from "@uiw/react-codemirror";

import { customEditorTheme } from "../utils";

const Editor = ({ code, setCode }) => {
  return (
    <div className="bg-[#191a30] p-2 h-[400px] max-h-1/2 overflow-y-auto font-light text-lg">
      <CodeMirror
        value={code}
        height="100%"
        extensions={[sql(), customEditorTheme]}
        theme="dark"
        basicSetup={true}
        style={{
          fontSize: "16px",
          color: "#FFFFFF",
          backgroundColor: "#191a30",
        }}
        className="bg-[#191a30] text-white"
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default Editor;
