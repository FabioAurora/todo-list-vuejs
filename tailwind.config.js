/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  safelist: ['line-through'],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
    extend: {},
    variants: {
      borderColor: ["responsive", "hover", "focus", "focus-within"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('flowbite/plugin')
  ],
};
