import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import "./CodeEditor.css"; // import the CSS file

type Props = {
  code: string;
  onAnalyzeLines: (selectedCode: string) => void;
  onAnalyzeFull: () => void;
};

export default function CodeEditor({ code, onAnalyzeLines, onAnalyzeFull }: Props) {
  const [selectedText, setSelectedText] = useState("");

  return (
    <div className="code-editor-container">
      <CodeMirror
        value={code}
        height="400px"
        theme={oneDark}
        extensions={[
          javascript(),
          EditorView.updateListener.of((update) => {
            if (update.selectionSet) {
              const selected = update.state.sliceDoc(
                update.state.selection.main.from,
                update.state.selection.main.to
              );
              setSelectedText(selected);
            }
          }),
        ]}
      />

      {/* <div className="buttons-container">
        <button className="glass-container" id="analyze-lines-btn" onClick={() => onAnalyzeLines(selectedText)}>
          Analyze Selected Lines
        </button>
        <button className="glass-container" id="analyze-full-btn" onClick={onAnalyzeFull}>
          Analyze Full Code
        </button>
      </div> */}
    </div>
  );
}
