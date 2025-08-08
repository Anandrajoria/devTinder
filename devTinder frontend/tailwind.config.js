/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'currentColor' }, // Use currentColor to match text color
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      }
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

