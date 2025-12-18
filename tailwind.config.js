/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        calmBg: "#fafafa",
        calmText: "#2f2f2f",
        calmSubtext: "#6b6b6b",
        calmAccent: "#e8f0ec",

        darkBg: "#0a0b0e",        // darker background
    darkCard: "#111318",     // card slightly lighter
    darkText: "#e6e8eb",     // soft white (not pure)
    darkSubtext: "#9aa0aa",  // muted gray
    darkAccent: "#1f2a24"
      }
    }
  },
  plugins: [],
}
