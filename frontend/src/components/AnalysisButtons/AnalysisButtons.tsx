import React from "react";
import { toast } from "sonner";
import './AnalysisButtons.css';


interface AnalysisButtonsProps {
  selectedText: string;
  historyLength: number;
  analyzeCode: (code: string, updateEditor?: boolean) => Promise<void>;
  analyzeFull: () => Promise<void>;
  scrollToBottom: () => void;
}

const AnalysisButtons: React.FC<AnalysisButtonsProps> = ({
  selectedText,
  historyLength,
  analyzeCode,
  analyzeFull,
  scrollToBottom,
}) => {
  const handleAnalyzeLines = () => {
    if (selectedText.trim().length === 0) {
      toast.error("Please select at least one line to analyze");
      return;
    }
    if (historyLength === 0) scrollToBottom();
    analyzeCode(selectedText, false);
  };

  const handleAnalyzeFull = () => {
    if (historyLength === 0) scrollToBottom();
    analyzeFull();
  };

  return (
    <div className="buttons-container">
      <div onClick={handleAnalyzeLines}>
        <div className="main-btn" id="analyze-lines">
          <button className="analyze-btn">Analyze Selected Lines</button>
        </div>
      </div>

      <div onClick={handleAnalyzeFull}>
        <div className="main-btn" id="analyze-full">
          <button className="analyze-btn">Analyze Full Code</button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisButtons;
