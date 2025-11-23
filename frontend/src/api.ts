import axios from "axios";

export const analyzeCode = async (code: string) => {
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/analyze`, { code });
  return res.data;
};
