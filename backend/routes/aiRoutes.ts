import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log(process.env.OPENAI_API_KEY)
router.post("/analyze", async (req, res) => {
  try {
    const { code } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert software engineer.
When given code, provide:
1️⃣ A short summary of what the code does.
2️⃣ An explanation of key lines and logic.
3️⃣ Suggested improvements or optimizations.
4️⃣ A rewritten version of the code with improvements.
Return everything in JSON format with fields:
{ "summary": "...", "explanation": "...", "suggestions": "...", "improvedCode": "..." }`
        },
        { role: "user", content: code }
      ],
    });

    let responseText = completion.choices[0].message?.content || "{}";

    // הסרת backticks אם קיימים
    responseText = responseText.replace(/^```json\s*|\s*```$/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (parseErr) {
      console.warn("Failed to parse JSON, sending raw response:", parseErr);
      parsed = { raw: responseText }; // במקום לקרוס, שולח את הטקסט הגולמי
    }
console.log(parsed)
    res.json(parsed);
  } catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }

  // fallback (non-Error values)
  return res.status(500).json({ error: "Unknown error occurred" });
}

});

// Wake-up endpoint
router.get('/wakeup', (req, res) => {
  // console.log('first')
  res.status(200).send('Server is awake!');
  //   setTimeout(() => {
  //   res.status(200).send('Server is awake!');
  // }, 5000); // 5000ms = 5 seconds
});

export default router;
