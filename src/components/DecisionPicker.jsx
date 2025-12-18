import { useState } from "react"
import { aiDecide } from "../utils/aiDecide"

console.log("🔥 REAL DecisionPicker loaded")

function DecisionPicker({ energy, addToHistory }) {
  const [options, setOptions] = useState(["", ""])
  const [suggestion, setSuggestion] = useState("")
  const [loading, setLoading] = useState(false)

  const updateOption = (index, value) => {
    const next = [...options]
    next[index] = value
    setOptions(next)
  }

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""])
    }
  }

  const helpDecide = async () => {
    console.log("🟢 REAL HelpDecide triggered")

    const filled = options.filter(o => o.trim())
    if (filled.length < 2) {
      setSuggestion("Add at least two options.")
      return
    }

    setLoading(true)
    setSuggestion("Thinking quietly…")

    console.log("🧠 REAL calling aiDecide")

    const result = await aiDecide({
      type: "decision",
      context: { energy },
      options: filled
    })

    let finalText

    if (result) {
      finalText = `This could work: ${result}`
      console.log("🤖 REAL AI RESULT:", result)
    } else {
      const fallback = filled[Math.floor(Math.random() * filled.length)]
      finalText = `This could work: ${fallback}`
      console.log("⚠️ REAL fallback used")
    }

    setLoading(false)
    setSuggestion(finalText)
    addToHistory?.(finalText)
  }

  return (
    <div className="mt-8 bg-white dark:bg-darkCard rounded-xl border border-gray-100 dark:border-gray-800 p-5">
      
      <h2 className="text-sm font-medium mb-3">
        Quick Decision Picker
      </h2>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={e => updateOption(i, e.target.value)}
            placeholder={`Option ${i + 1}`}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-calmAccent"
          />
        ))}
      </div>

      {/* Add option */}
      {options.length < 6 && (
        <button
          onClick={addOption}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          + Add option
        </button>
      )}

      {/* Decide button */}
      <button
        onClick={helpDecide}
        className="mt-4 w-full rounded-lg bg-calmAccent py-2 text-sm transition-colors hover:bg-[#dde8e2]"
        disabled={loading}
      >
        {loading ? "Thinking…" : "Help me decide"}
      </button>

      {/* Result */}
      {suggestion && (
        <p className="mt-4 text-sm text-calmSubtext">
          {suggestion}
        </p>
      )}
    </div>
  )
}

export default DecisionPicker
