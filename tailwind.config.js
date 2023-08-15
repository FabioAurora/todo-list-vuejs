/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  },
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
    extend: {
      transformOrigin: {
        "0": "0%",
      },
      colors: {
        "bg-semi-75": "rgba(0, 0, 0, 0.75)",
      },
      zIndex: {
        "-1": "-1",
      },
    },
    variants: {
      borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
