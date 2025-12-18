import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
console.log(
  "🔑 OPENROUTER_API_KEY loaded:",
  process.env.OPENROUTER_API_KEY ? "YES" : "NO"
)

const app = express()
app.use(cors())
app.use(express.json())

/**
 * AI Decision Endpoint (OpenRouter - AllenAI OLMo 3.1 32B Think)
 */
app.post("/ai/decide", async (req, res) => {
  console.log("🔥 OpenRouter AI endpoint HIT")

  const { options } = req.body

  if (!options || options.length < 2) {
    return res.json({ result: null })
  }

  const prompt = `
Choose the safest and most practical option.
Avoid harmful, unrealistic, or dangerous choices.

Options:
${options.map(o => `- ${o}`).join("\n")}

Rules:
- Prefer safety and common sense.
- Do not explain.
- Do not add extra words.

Return ONLY the best option text.
`

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "calm-decisions"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct",
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
          max_tokens: 60
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("❌ OpenRouter error:", data)
      return res.json({ result: null })
    }

    const result =
      data.choices?.[0]?.message?.content?.trim() || null

    console.log("🤖 OpenRouter result:", result)

    res.json({ result })
  } catch (err) {
    console.error("❌ Server error:", err)
    res.json({ result: null })
  }
})

/**
 * Start Server
 */
app.listen(3001, () => {
  console.log("AI decision engine running on http://localhost:3001")
})
