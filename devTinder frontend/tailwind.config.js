/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.4s ease-out forwards",
      },
    },
  },
  plugins: [daisyui, animate],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "aqua",
      "forest",
      "lofi",
    ],
  },
};
