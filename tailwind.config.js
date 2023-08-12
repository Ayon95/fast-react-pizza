/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Anything outside of extend will overwrite default values
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
  plugins: [],
};
