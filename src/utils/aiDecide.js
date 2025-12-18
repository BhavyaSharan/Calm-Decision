export async function aiDecide({ type, context, options }) {
  console.log("🧠 aiDecide called:", { type, context, options })

  try {
    const response = await fetch("http://localhost:3001/ai/decide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        context,
        options
      })
    })

    const data = await response.json()
    console.log("🤖 AI response:", data)

    return data.result || null
  } catch (err) {
    console.error("❌ aiDecide error:", err)
    return null
  }
}
