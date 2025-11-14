import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import AnalysisPanel from "./components/AnalysisPanel";
import axios from "axios";
import GradientBg from "./components/GradientBg";
import AnalaysisCards from "./components/AnalaysisCards";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { motion, AnimatePresence } from "framer-motion";
import './App.css';
import Title from "./components/Title";
import FancyButton from "./components/FancyButton";
import Loader from "./components/Loader";

type Analysis = {
  code: string;
  result: {
    summary?: string;
    explanation?: string;
    suggestions?: string;
    improvedCode?: string;
    raw?: string;
  };
};

export default function App() {
  const [analysis, setAnalysis] = useState<any>({});
  const [history, setHistory] = useState<Analysis[]>([]);
  const [currentCode, setCurrentCode] = useState<string>(`
function sum(a, b) {
  return a + b;
}
console.log(sum(2, 3));
`);

  const [modalItem, setModalItem] = useState<Analysis | null>(null);

  const analyzeSelected = async (selectedCode: string) => {
    if (!selectedCode) return;
    await analyzeCode(selectedCode);
  };

  const analyzeFull = async () => {
    await analyzeCode(currentCode);
  };

// inside analyzeCode function
const analyzeCode = async (code: string) => {
  try {
    const res = await axios.post("http://localhost:5001/api/ai/analyze", { code });
    const result = res.data;

    const title = code.split(/\s+/).slice(0, 4).join(" "); // first 1-4 words
    setAnalysis(result);
    setHistory(prev => [{ code, result, title }, ...prev]);
    setCurrentCode(code);
  } catch (err) {
    console.error(err);
    const errorResult = { raw: "Error fetching analysis" };
    const title = code.split(/\s+/).slice(0, 4).join(" ");
    setAnalysis(errorResult);
    setHistory(prev => [{ code, result: errorResult, title }, ...prev]);
    setCurrentCode(code);
  }
};

  const openModal = (item: Analysis) => {
    setModalItem(item);
  };

  const closeModal = () => {
    setModalItem(null);
  };

  const analyzeFromModal = async () => {
    if (!modalItem) return;
    await analyzeCode(modalItem.code);
    closeModal();
  };

  

  return (
    <div id='app' className="relative w-full h-full bg-background">
      <GradientBg />
      {/* <div className="glass-container">hi there</div> */}
<Title/>
<AnalaysisCards />

      <CodeEditor
        code={currentCode}
        onAnalyzeLines={analyzeSelected}
        onAnalyzeFull={analyzeFull}
        />
        <div onClick={analyzeFull}>
        <FancyButton/>
        </div>
        <Loader/>
      <AnalysisPanel analysis={analysis} />

      {/* History Cards */}
      <div className="history-list">
        <h3>History:</h3>
        <div className="history-cards">
  {history.map((item, idx) => (
    <motion.div
      key={idx}
      layoutId={`card-${idx}`}
      className="history-card"
      onClick={() => openModal(item)}
    >
      <CodeMirror
        value={item.code}
        height="250px"
        theme={oneDark}
        extensions={[javascript()]}
        readOnly={true}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
      />
      <div className="history-card-title">
        {item.title}
      </div>
    </motion.div>
  ))}
</div>

      </div>

      {/* Modal */}
      
      <AnimatePresence>
        {modalItem && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              layoutId={`card-${history.findIndex(h => h === modalItem)}`}
            >
              <CodeMirror
                value={modalItem.code}
                height="300px"
                theme={oneDark}
                extensions={[javascript()]}
                onChange={(value) => setModalItem({ ...modalItem, code: value })}
              />
              <AnalysisPanel analysis={modalItem.result} />
              <div className="modal-buttons">
                <button className="analyze-modal-btn" onClick={analyzeFromModal}>
                  Analyze & Continue
                </button>
                <button className="close-modal-btn" onClick={closeModal}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
