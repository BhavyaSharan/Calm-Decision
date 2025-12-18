import { useState } from "react"
import { aiDecide } from "../utils/aiDecide"

function OutfitPicker() {
  const [outfits, setOutfits] = useState([])
  const [outfit, setOutfit] = useState("")
  const [weather, setWeather] = useState("normal")
  const [occasion, setOccasion] = useState("casual")
  const [suggestion, setSuggestion] = useState("")
  const [loading, setLoading] = useState(false)

  const addOutfit = () => {
    if (!outfit.trim()) return
    setOutfits([...outfits, outfit])
    setOutfit("")
  }

  const decideOutfit = async () => {
    if (outfits.length < 2) {
      setSuggestion("Add at least two outfits.")
      return
    }

    setLoading(true)

    const result = await aiDecide({
      type: "outfit",
      context: { weather, occasion },
      options: outfits
    })

    setLoading(false)

    setSuggestion(
      result
        ? `This outfit makes sense today: ${result}`
        : "Couldn’t decide right now."
    )
  }

  return (
    <div className="mt-8 bg-white dark:bg-darkCard rounded-xl border border-gray-100 dark:border-gray-800 p-5">
      <h2 className="text-sm font-medium mb-3">Outfit Picker</h2>

      <input
        value={outfit}
        onChange={e => setOutfit(e.target.value)}
        placeholder="Add outfit (e.g. Hoodie + jeans)"
        className="w-full rounded-lg border px-3 py-2 text-sm mb-2"
      />

      <button
        onClick={addOutfit}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        + Add outfit
      </button>

      <div className="flex gap-2 mt-3">
        <select
          value={weather}
          onChange={e => setWeather(e.target.value)}
          className="flex-1 rounded-lg border px-2 py-2 text-sm"
        >
          <option value="hot">Hot</option>
          <option value="normal">Normal</option>
          <option value="cold">Cold</option>
        </select>

        <select
          value={occasion}
          onChange={e => setOccasion(e.target.value)}
          className="flex-1 rounded-lg border px-2 py-2 text-sm"
        >
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="comfy">Comfy</option>
        </select>
      </div>

      <button
        onClick={decideOutfit}
        className="mt-4 w-full rounded-lg bg-calmAccent py-2 text-sm"
        disabled={loading}
      >
        {loading ? "Thinking…" : "Suggest outfit"}
      </button>

      {suggestion && (
        <p className="mt-4 text-sm text-calmSubtext">
          {suggestion}
        </p>
      )}
    </div>
  )
}

export default OutfitPicker
