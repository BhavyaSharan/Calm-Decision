import { useState, useEffect } from "react"
import FadeIn from "../components/FadeIn"
import EnergyToggle from "../components/EnergyToggle"
import DecisionPicker from "../components/DecisionPicker"
import YesNo from "../components/YesNo"
import FoodPicker from "../components/FoodPicker"
import OutfitPicker from "../components/OutfitPicker"
import History from "../components/History"

function Home() {
  const [energy, setEnergy] = useState("medium")
  const [darkMode, setDarkMode] = useState(false)
  const [history, setHistory] = useState([])

  // Load decision history
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("decision-history"))
    if (saved) setHistory(saved)
  }, [])

  // Save decision history
  useEffect(() => {
    localStorage.setItem("decision-history", JSON.stringify(history))
  }, [history])

  // Load dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem("calm-dark-mode")
    if (saved) setDarkMode(saved === "true")
  }, [])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("calm-dark-mode", darkMode)
  }, [darkMode])

  const addToHistory = (text) => {
    setHistory((prev) => [text, ...prev].slice(0, 5))
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300
        ${darkMode ? "bg-darkBg text-darkText" : "bg-calmBg text-calmText"}
      `}
      style={{
        backgroundImage: darkMode
          ? "radial-gradient(circle at top, #0f1116, #0a0b0e 60%)"
          : "none"
      }}
    >
      {/* Inner content container */}
      <div className="max-w-xl mx-auto px-4 pb-16">
        
        {/* Header */}
        <h1 className="text-2xl font-semibold mt-8">
          🌱 Calm Decisions
        </h1>

        <p
          className={`mt-4 leading-relaxed ${
            darkMode ? "text-darkSubtext" : "text-calmSubtext"
          }`}
        >
          This app helps reduce small daily decision stress.
          <br />
          Use it only if it feels helpful.
        </p>

        {/* Dark mode toggle */}
        

        {/* Energy */}
        <FadeIn>
          <EnergyToggle energy={energy} setEnergy={setEnergy} />
        </FadeIn>

        {/* Decision Picker */}
        <FadeIn delay={0.05}>
          <DecisionPicker energy={energy} addToHistory={addToHistory} />
        </FadeIn>

        {/* Yes / No */}
        <FadeIn delay={0.1}>
          <YesNo />
        </FadeIn>

        {/* Food */}
        <FadeIn delay={0.15}>
          <FoodPicker />
        </FadeIn>

        {/* Outfit */}
        <FadeIn delay={0.2}>
          <OutfitPicker />
        </FadeIn>

        {/* History */}
        <FadeIn delay={0.25}>
          <History history={history} clearHistory={clearHistory} />
        </FadeIn>

        {/* Privacy note */}
        <p
          className={`mt-16 text-xs ${
            darkMode ? "text-darkSubtext" : "text-calmSubtext"
          }`}
        >
          Your data stays on your device.
        </p>
      </div>
    </div>
  )
}

export default Home
