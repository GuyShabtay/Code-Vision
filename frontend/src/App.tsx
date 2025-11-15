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
  const [selectedText, setSelectedText] = useState("");

  const [currentCode, setCurrentCode] = useState<string>(`
function sum(a, b) {
  return a + b;
}
console.log(sum(2, 3));
`);
  const [modalItem, setModalItem] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  
  const scrollToBottom = () => {
  requestAnimationFrame(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });
};



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
    <div id="app" className="w-full h-full bg-background">
      <GradientBg />
     <div className="title-container">
  <Title />
</div>
<FadeOnScroll clipLine={200}>
  <AnalaysisCards />
</FadeOnScroll>

<FadeOnScroll clipLine={200}>
<CodeEditor
  code={currentCode}
  onChange={(val) => setCurrentCode(val)}
  onAnalyzeLines={analyzeCode}
  onAnalyzeFull={analyzeFull}
  onSelectedTextChange={(txt) => setSelectedText(txt)}   // 👈 NEW
/>


</FadeOnScroll>

<FadeOnScroll clipLine={200}>
   <div className="buttons-container">
      
  <div
  onClick={() => {
    if (selectedText.trim().length === 0) return; // nothing selected
    analyzeCode(selectedText);
  }}
>
  <div className="container1" id="analyze-lines">
    <button className="button">Analyze Selected Lines</button>
  </div>
</div>


  <div
  onClick={() => {
    if (history.length === 0) {
      scrollToBottom();   // 👈 scroll instantly BEFORE analysis starts
    }
    analyzeFull();
  }}
>

    <div className="container1" id='analyze-full'>
  <button className="button">Analyze Full Code</button>
</div>
  </div>
 


  </div>
</FadeOnScroll>

  {loading ? (
  <Loader />
) : Object.keys(analysis).length > 0 ? (
  <FadeOnScroll clipLine={200}>
    <AnalysisPanel analysis={analysis} />
  </FadeOnScroll>
) : null}


<FadeOnScroll clipLine={200}>
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
  value={code}
  height="500px"
  theme={oneDark}
  extensions={[javascript()]}
  onChange={(value) => onChange(value)}
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
