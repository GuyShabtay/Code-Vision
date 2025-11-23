import React from "react";
import "./AnalysisPanel.css"; 

type Props = {
  analysis: {
    summary?: string;
    explanation?: string;
    suggestions?: string;
    improvedCode?: string;
    raw?: string;
  };
};

export default function AnalysisPanel({ analysis }: Props) {
  return (
    <div className="analysis-panel">
      {analysis.summary && (
        <>
          <h3 className="section-title">Summary:</h3>
          <p className="section-text">{analysis.summary}</p>
        </>
      )}
      {analysis.explanation && (
        <>
          <h3 className="section-title">Explanation:</h3>
          <p className="section-text">{analysis.explanation}</p>
        </>
      )}
      {analysis.suggestions && (
        <>
          <h3 className="section-title">Suggestions:</h3>
          <p className="section-text">{analysis.suggestions}</p>
        </>
      )}
      {analysis.improvedCode && (
        <>
          <h3 className="section-title">Improved Code:</h3>
          <pre className="code-block">{analysis.improvedCode}</pre>
        </>
      )}
      {analysis.raw && (
        <>
          <h3 className="section-title">Raw Response:</h3>
          <pre className="raw-block">{analysis.raw}</pre>
        </>
      )}
    </div>
  );
}
