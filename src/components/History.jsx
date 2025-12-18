function History({ history, clearHistory }) {
  if (history.length === 0) return null

  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-medium mb-3">
        Recent decisions
      </h2>

      <ul className="space-y-2">
        {history.map((item, index) => (
          <li
            key={index}
            className="text-sm text-calmSubtext"
          >
            {item}
          </li>
        ))}
      </ul>

      <button
        onClick={clearHistory}
        className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        Clear history
      </button>
    </div>
  )
}

export default History
