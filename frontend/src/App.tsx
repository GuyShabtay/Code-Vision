import React, { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import axios from "axios";
import GradientBg from "./components/GradientBg";
import AnalaysisCards from "./components/AnalaysisCards/AnalaysisCards";
import {  AnimatePresence } from "framer-motion";
import './App.css';
import Title from "./components/Title/Title";
import Loader from "./components/Loader/Loader";
import History from "./components/History/History";
import FadeOnScroll from "./components/FadeOnScroll";
import ResultCard from "./components/ResultCard/ResultCard";
import { toast} from 'sonner';
import Modal from "./components/Modal/Modal";
import AnalysisButtons from "./components/AnalysisButtons/AnalysisButtons";


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

  const [currentCode, setCurrentCode] = useState<string>(`//Example Code
function sum(a, b) {
  return a + b;
}
console.log(sum(2, 3));
`);
  const [modalItem, setModalItem] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverLoading, setServerLoading] = useState(true);

  
  const scrollToBottom = () => {
  requestAnimationFrame(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });
};
 useEffect(() => {
    sessionStorage.clear();

    // Wake up server
    const wakeUpServer = async () => {
      try {
        const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ai/wakeup`); 
        console.log('response.data',response.data)
        toast.success('Server is awake!')

      } catch (err) {
        toast.error('Failed to wake up server')

      } finally {
        setServerLoading(false);
      }
    };
    wakeUpServer();
  }, []);


  const analyzeCode = async (code: string, updateEditor: boolean = true) => {
  setLoading(true);
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/analyze`, { code });
    const result = res.data;

    const title = code.split(/\s+/).slice(0, 4).join(" ");

    setAnalysis(result);
    setHistory(prev => [{ code, result, title }, ...prev]);

    if (updateEditor) {
      setCurrentCode(code);
    }
    toast.success("Code analysis finished successfully")

  } catch (err) {
    console.error(err);

    const errorResult = { raw: "Error fetching analysis" };
    const title = code.split(/\s+/).slice(0, 4).join(" ");

    setAnalysis(errorResult);
    setHistory(prev => [{ code, result: errorResult, title }, ...prev]);

    if (updateEditor) {
      setCurrentCode(code);
    }
    toast.error("Something went wrong during the analysis")

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
  onSelectedTextChange={(txt) => setSelectedText(txt)}  
/>


</FadeOnScroll>

<FadeOnScroll clipLine={200}>
  <AnalysisButtons
    selectedText={selectedText}
    historyLength={history.length}
    analyzeCode={analyzeCode}
    analyzeFull={analyzeFull}
    scrollToBottom={scrollToBottom}
  />
</FadeOnScroll>

{serverLoading && (
                <div className="server-status">
                  <p>Waking up the server, please wait...</p>
                  <div className="server-loader"></div>
                </div>
              )}


{loading ? (
  <Loader />
) : Object.keys(analysis).length > 0 ? (
  <FadeOnScroll clipLine={200}>

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
    </FadeOnScroll>

) : null}

<FadeOnScroll clipLine={200}>
  <History history={history} onSelect={setModalItem} />
</FadeOnScroll>

  <AnimatePresence>
  {modalItem && (
    <Modal
      item={modalItem}
      setItem={setModalItem}
      onClose={() => setModalItem(null)}
      layoutId={`card-${history.findIndex(h => h === modalItem)}`}
      onUpdateMain={(item) => {
        setCurrentCode(item.code);
        setAnalysis(item.result);
        setModalItem(null);
        toast.info("Preview updated on the main page");
      }}
    />
  )}
</AnimatePresence>

    </div>
  );
}
