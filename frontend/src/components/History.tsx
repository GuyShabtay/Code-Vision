import React from "react";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

type Analysis = {
  code: string;
  result: any;
  title?: string;
};

type HistoryProps = {
  history: Analysis[];
  onSelect: (item: Analysis) => void;
};

const History: React.FC<HistoryProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="history-list">
      <h4>History</h4>
      <div className="history-cards">
        {history.reverse().map((item, idx) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            key={idx}
            layoutId={`card-${idx}`}
            className="history-card"
            onClick={() => onSelect(item)}
          >
            <CodeMirror
              value={item.code}
              height="250px"
              theme={oneDark}
              extensions={[javascript()]}
              readOnly
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
              }}
            />
            <div className="history-card-title">{item.title}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
