import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // AFTER
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
      },
    },
  },

  plugins: [],
};
export default config;
