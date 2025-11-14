import React from "react";

export default function CodeAnalysis({ analysis }: { analysis: any }) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-3">🧠 ניתוח הקוד</h2>
      <p><strong>מה הקוד עושה:</strong> {analysis.summary}</p>
      <p className="mt-2"><strong>הסבר שורות עיקריות:</strong> {analysis.explanation}</p>
      <p className="mt-2"><strong>שיפורים מוצעים:</strong> {analysis.suggestions}</p>
    </div>
  );
}
