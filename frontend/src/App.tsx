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
import ResultCard from "./components/ResultCard/ResultCard";

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



  const analyzeCode = async (code: string, updateEditor: boolean = true) => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:5001/api/ai/analyze", { code });
    const result = res.data;

    const title = code.split(/\s+/).slice(0, 4).join(" ");

    setAnalysis(result);
    setHistory(prev => [{ code, result, title }, ...prev]);

    if (updateEditor) {
      setCurrentCode(code);
    }

  } catch (err) {
    console.error(err);

    const errorResult = { raw: "Error fetching analysis" };
    const title = code.split(/\s+/).slice(0, 4).join(" ");

    setAnalysis(errorResult);
    setHistory(prev => [{ code, result: errorResult, title }, ...prev]);

    if (updateEditor) {
      setCurrentCode(code);
    }

  } finally {
    setLoading(false);
  }
};


 const analyzeFull = async () => {
  await analyzeCode(currentCode, true);
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
     if (history.length === 0) {
      scrollToBottom();   // 👈 scroll instantly BEFORE analysis starts
    }
    analyzeCode(selectedText, false);

  }}
>
  <div className="container1" id="analyze-lines">
    <button className="analyze-btn">Analyze Selected Lines</button>
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
  <button className="analyze-btn">Analyze Full Code</button>
</div>
  </div>
 


  </div>
</FadeOnScroll>

  {/* {loading ? (
  <Loader />
) : Object.keys(analysis).length > 0 ? (
  <FadeOnScroll clipLine={200}>
    <AnalysisPanel analysis={analysis} />
  </FadeOnScroll>
) : null} */}

{loading ? (
  <Loader />
) : Object.keys(analysis).length > 0 ? (
    <div className="result-cards-container">
      <div className="one-line">
      <ResultCard analysis={{ summary: analysis.summary }} />
      <ResultCard analysis={{ explanation: analysis.explanation }} />
      </div>
      <ResultCard
        analysis={{
          suggestions: analysis.suggestions,
          improvedCode: analysis.improvedCode,
        }}
      />
    </div>
) : null}



{/* <FadeOnScroll clipLine={200}> */}
  {/* <ResultCard/> */}
{/* </FadeOnScroll> */}
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
      onClick={() => setModalItem(null)} // click outside closes modal
    >
      <motion.div
        className="modal-content"
        layoutId={`card-${history.findIndex(h => h === modalItem)}`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Top-right X button */}
                  <span onClick={() => setModalItem(null)} className="modal-close-x material-icons-round">close</span>


        <CodeMirror
          style={{ boxShadow: '0 3px 10px rgba(255, 255, 255, 0.2)' }}
          value={modalItem.code}
          height="500px"
          theme={oneDark}
          extensions={[javascript()]}
          onChange={(value) =>
            setModalItem(prev => prev ? { ...prev, code: value } : prev)
          }
        />

        <AnalysisPanel analysis={modalItem.result} />

        {/* <div className="modal-buttons">
          <button
            className="analyze-modal-btn"
            onClick={() => {
              if (!modalItem) return;
              // Set the main page data to modal data
              setCurrentCode(modalItem.code);
              setAnalysis(modalItem.result);
              setModalItem(null); // close modal
            }}
          >
            Preview in Main Page
          </button>
        </div> */}
        <div className="container1" id='preview-main-page'>
  <button className="analyze-btn"
            onClick={() => {
              if (!modalItem) return;
              // Set the main page data to modal data
              setCurrentCode(modalItem.code);
              setAnalysis(modalItem.result);
              setModalItem(null); // close modal
            }}
          >
            Preview in Main Page
            
            </button>
</div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </div>
  );
}
