import React from "react";

type Props = {
  analysis: {
    summary?: string;
    explanation?: string;
    suggestions?: string;
    improvedCode?: string;
    raw?: string;
  };
};

export default function BubblePanel({ analysis }: Props) {
  return (
    <div className="w-1/3 bg-gray-800 text-white p-4 rounded-lg ml-4 overflow-auto max-h-[400px]">
      {analysis.summary && (
        <>
          <h3 className="font-bold text-lg mb-1">Summary:</h3>
          <p className="mb-2">{analysis.summary}</p>
        </>
      )}
      {analysis.explanation && (
        <>
          <h3 className="font-bold text-lg mb-1">Explanation:</h3>
          <p className="mb-2">{analysis.explanation}</p>
        </>
      )}
      {analysis.suggestions && (
        <>
          <h3 className="font-bold text-lg mb-1">Suggestions:</h3>
          <p className="mb-2">{analysis.suggestions}</p>
        </>
      )}
      {analysis.improvedCode && (
        <>
          <h3 className="font-bold text-lg mb-1">Improved Code:</h3>
          <pre className="bg-gray-700 p-2 rounded overflow-auto">{analysis.improvedCode}</pre>
        </>
      )}
      {analysis.raw && (
        <>
          <h3 className="font-bold text-lg mb-1">Raw Response:</h3>
          <pre className="bg-gray-700 p-2 rounded overflow-auto">{analysis.raw}</pre>
        </>
      )}
    </div>
  );
}
