import { useState } from "react"

function YesNo() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [thinking, setThinking] = useState(false)

  const decide = () => {
    if (!question.trim()) return

    setThinking(true)
    setAnswer("")

    setTimeout(() => {
      const responses = ["Yes.", "No.", "Think once more."]
      setAnswer(responses[Math.floor(Math.random() * responses.length)])
      setThinking(false)
    }, 2000)
  }

  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-medium mb-3">
        Yes / No Helper
      </h2>

      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Type your question here"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-calmAccent"
      />

      <button
        onClick={decide}
        className="mt-4 w-full rounded-lg bg-calmAccent py-2 text-sm hover:bg-[#dde8e2]"
      >
        Help me decide
      </button>

      {thinking && (
        <p className="mt-3 text-sm text-gray-400">
          Thinking…
        </p>
      )}

      {answer && (
        <p className="mt-3 text-sm text-calmSubtext">
          {answer}
        </p>
      )}
    </div>
  )
}

export default YesNo
