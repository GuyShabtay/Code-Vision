import React from "react";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import AnalysisPanel from "../AnalysisPanel/AnalysisPanel";
import './Modal.css'

type Analysis = {
  code: string;
  result: {
    summary?: string;
    explanation?: string;
    suggestions?: string;
    improvedCode?: string;
    raw?: string;
  };
  title?: string;
};

interface ModalProps {
  item: Analysis;
  onClose: () => void;
  onUpdateMain: (item: Analysis) => void;
  layoutId: string;
  setItem: React.Dispatch<React.SetStateAction<Analysis | null>>;
}

const Modal: React.FC<ModalProps> = ({ item, onClose, onUpdateMain, layoutId, setItem }) => {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        layoutId={layoutId}
        onClick={(e) => e.stopPropagation()}
      >
        <span onClick={onClose} className="modal-close-x material-icons-round">close</span>

        <CodeMirror
          style={{ boxShadow: '0 3px 10px rgba(255, 255, 255, 0.2)' }}
          value={item.code}
          height="500px"
          theme={oneDark}
          extensions={[javascript()]}
          onChange={(value) =>
            setItem(prev => prev ? { ...prev, code: value } : prev)
          }
        />

        <AnalysisPanel analysis={item.result} />

        <div className="main-btn" id="preview-main-page">
          <button
            className="analyze-btn"
            onClick={() => onUpdateMain(item)}
          >
            Preview in Main Page
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
