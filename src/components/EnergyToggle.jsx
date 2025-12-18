function EnergyToggle({ energy, setEnergy }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <p style={{ marginBottom: "0.5rem", color: "#666" }}>
        How’s your energy right now?
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        {["low", "medium", "high"].map(level => (
          <button
            key={level}
            onClick={() => setEnergy(level)}
            style={{
              ...buttonStyle,
              backgroundColor: energy === level ? "#e8f0ec" : "#f4f4f4"
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

const buttonStyle = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontSize: "0.9rem"
}

export default EnergyToggle
