import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import "./CodeEditor.css"; 

type Props = {
  code: string;
  onChange: (value: string) => void;
  onAnalyzeLines: (code: string) => void;
  onAnalyzeFull: () => void;
  onSelectedTextChange: (value: string) => void;  
};


export default function CodeEditor({
  code,
  onChange,
  onAnalyzeLines,
  onAnalyzeFull,
  onSelectedTextChange
}: Props) {
  const [selectedText, setSelectedText] = useState("");

  return (
    <div className="code-editor-container">
      <CodeMirror
        value={code}
        height="500px"
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
              onSelectedTextChange(selected);     
            }
          }),
        ]}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
}
