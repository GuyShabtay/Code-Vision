import React from "react";

interface Props {
  original: string;
  improved: string;
}

export default function CodeComparison({ original, improved }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto mt-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 relative">
        <h3 className="text-red-700 font-bold mb-2">🚫 קוד מקורי</h3>
        <pre className="text-sm font-mono whitespace-pre-wrap">{original}</pre>
        <button
          className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => copyToClipboard(original)}
        >
          העתק
        </button>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 relative">
        <h3 className="text-green-700 font-bold mb-2">✅ קוד משופר</h3>
        <pre className="text-sm font-mono whitespace-pre-wrap text-green-800">{improved}</pre>
        <button
          className="absolute top-2 right-2 text-xs bg-green-600 text-white px-2 py-1 rounded"
          onClick={() => copyToClipboard(improved)}
        >
          העתק
        </button>
      </div>
    </div>
  );
}
