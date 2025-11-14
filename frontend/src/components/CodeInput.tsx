import React from "react";

interface Props {
  code: string;
  setCode: (val: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}

export default function CodeInput({ code, setCode, onAnalyze, loading }: Props) {
  return (
    <div className="flex flex-col items-center mb-6">
      <textarea
        className="w-full max-w-3xl p-4 rounded-lg border border-gray-300 shadow-sm font-mono text-sm h-64 resize-none"
        placeholder="הדבק כאן קוד להסבר..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={onAnalyze}
        disabled={loading || !code.trim()}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "מנתח..." : "נתח את הקוד"}
      </button>
    </div>
  );
}
