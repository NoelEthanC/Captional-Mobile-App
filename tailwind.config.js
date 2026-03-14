/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Surfaces
        canvas: "#FAFAFA",
        surface: "#FFFFFF",
        overlay: "#F2F2F2",

        // Ink scale — used as: text-ink, text-ink-muted, text-ink-faint
        //                       bg-ink,  border-ink-faint, etc.
        ink: {
          DEFAULT: "#0A0A0A",
          muted: "#6B6B6B",
          faint: "#C4C4C4",
        },

        // Dark surfaces (editor)
        void: {
          DEFAULT: "#0A0A0A",
          soft: "#1A1A1A",
          border: "#2E2E2E",
        },

        // Borders
        border: {
          DEFAULT: "#E8E8E8",
          dashed: "#C4C4C4",
        },
      },

      fontFamily: {
        sans: ["DM Sans", "system-ui"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["DM Mono", "monospace"],
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
