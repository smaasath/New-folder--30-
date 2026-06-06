/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFF8EA",
        cream: "#F8EED8",
        gold: "#C9A24D",
        "deep-gold": "#A67C2D",
        emerald: "#123C2F",
        "ink-brown": "#3A2A1A",
      },
      fontFamily: {
        arabic: ["Amiri", "Noto Naskh Arabic", "serif"],
        display: ["Cinzel", "serif"],
        serif: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 22px 70px rgba(80, 55, 20, 0.15)",
        gold: "0 0 0 1px rgba(201, 162, 77, 0.35), 0 26px 80px rgba(80, 55, 20, 0.14)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
