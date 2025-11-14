import axios from "axios";

export const analyzeCode = async (code: string) => {
  const res = await axios.post("http://localhost:5001/api/ai/analyze", { code });
  return res.data;
};
