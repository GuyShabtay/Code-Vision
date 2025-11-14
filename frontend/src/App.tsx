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
import History from "./components/History";
import FadeOnScroll from "./components/FadeOnScroll";

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
  const [loading, setLoading] = useState(false);

  const analyzeCode = async (code: string) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/ai/analyze", { code });
      const result = res.data;

      const title = code.split(/\s+/).slice(0, 4).join(" ");
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
    } finally {
      setLoading(false);
    }
  };

  const analyzeFull = async () => {
    await analyzeCode(currentCode);
  };

  return (
    <div id="app" className="relative w-full h-full bg-background">
      <GradientBg />
     <div className="title-container">
  <Title />
</div>

<FadeOnScroll fadeStart={200} fadeEnd={150}>
  <AnalaysisCards />
</FadeOnScroll>

<FadeOnScroll fadeStart={200} fadeEnd={150}>
  <CodeEditor
    code={currentCode}
    onAnalyzeLines={analyzeCode}
    onAnalyzeFull={analyzeFull}
  />
</FadeOnScroll>

<FadeOnScroll fadeStart={300} fadeEnd={150}>
   <div className="buttons-container">
      
  <div onClick={analyzeFull}>
    <FancyButton />
  </div>
  <div onClick={analyzeFull}>
    <FancyButton />
  </div>
  </div>
</FadeOnScroll>

<FadeOnScroll fadeStart={300} fadeEnd={150}>
  {loading ? <Loader /> : Object.keys(analysis).length > 0 ? <AnalysisPanel analysis={analysis} /> : null}
</FadeOnScroll>

<FadeOnScroll fadeStart={300} fadeEnd={150}>
  <History history={history} onSelect={setModalItem} />
</FadeOnScroll>






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
                onChange={(value) =>
                  setModalItem({ ...modalItem, code: value })
                }
              />
              <AnalysisPanel analysis={modalItem.result} />
              <div className="modal-buttons">
                <button
                  className="analyze-modal-btn"
                  onClick={async () => {
                    if (!modalItem) return;
                    await analyzeCode(modalItem.code);
                    setModalItem(null);
                  }}
                >
                  Analyze & Continue
                </button>
                <button
                  className="close-modal-btn"
                  onClick={() => setModalItem(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
