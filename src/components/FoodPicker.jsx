import { useState } from "react"
import { aiDecide } from "../utils/aiDecide"

function FoodPicker() {
  const [foods, setFoods] = useState([])
  const [food, setFood] = useState("")
  const [energy, setEnergy] = useState("normal")
  const [suggestion, setSuggestion] = useState("")
  const [loading, setLoading] = useState(false)

  const addFood = () => {
    if (!food.trim()) return
    setFoods([...foods, food])
    setFood("")
  }

  const decideFood = async () => {
    if (foods.length < 2) {
      setSuggestion("Add at least two food options.")
      return
    }

    setLoading(true)

    const result = await aiDecide({
      type: "food",
      context: { energy },
      options: foods
    })

    setLoading(false)

    setSuggestion(
      result
        ? `This could be a good choice: ${result}`
        : "Couldn’t decide right now. Try again."
    )
  }

  return (
    <div className="mt-8 bg-white dark:bg-darkCard rounded-xl border border-gray-100 dark:border-gray-800 p-5">
      <h2 className="text-sm font-medium mb-3">Food Decision Helper</h2>

      <input
        value={food}
        onChange={e => setFood(e.target.value)}
        placeholder="Add food (e.g. Dal chawal)"
        className="w-full rounded-lg border px-3 py-2 text-sm mb-2"
      />

      <button
        onClick={addFood}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        + Add food
      </button>

      <div className="mt-3">
        <select
          value={energy}
          onChange={e => setEnergy(e.target.value)}
          className="w-full rounded-lg border px-2 py-2 text-sm"
        >
          <option value="low">Low energy</option>
          <option value="normal">Normal</option>
          <option value="high">High energy</option>
        </select>
      </div>

      <button
        onClick={decideFood}
        className="mt-4 w-full rounded-lg bg-calmAccent py-2 text-sm"
        disabled={loading}
      >
        {loading ? "Thinking…" : "Help me choose food"}
      </button>

      {suggestion && (
        <p className="mt-4 text-sm text-calmSubtext">
          {suggestion}
        </p>
      )}
    </div>
  )
}

export default FoodPicker
