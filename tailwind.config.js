/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        iransans: ["var(--site-font)"],
      },
      fontSize: {
        "size-1": "80px",
        "size-2": "36px",
        "size-3": "26px",
        "size-4": "17px",
      },

      colors: {
        primary: {
          50: "#cf9ced",
          100: "#9f3ed7",
          300: "#700caa",
          400: "#580c85",
          600: "#410963",
          700: "#370655",
          800: "#2c0345",
          900: "#1e022f",
        },
        secondry: {
          500: "#D6725C",
        },
        hgray: {
          100: "#ffffff",
          200: "#fafafb",
          300: "#e7e7ea",
          350: "#bfbfbf",
          400: "#7c7c7c",
          500: "#686868",
          600: "#59595a",
        },
        mdark: {
          300: "#80D3C9",
          400: "#3C4059",
          500: "#1C1C28",
          600: "#28293D",
        },
        "text-dark": {
          1: "#E7FADB",
          2: "#F7E2DE",
          3: "#E1EFF4",
          4: "#E5DFF6",
          5: "#FEFDD8",
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(100%)" },
        },
        blink: {
          "0%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100% ": { opacity: "0.2" },
        },
      },
      animation: {
        fadeIn: "fadeIn .3s ease-in-out",
        carousel: "marquee 10s linear infinite",
        blink: "blink 1.4s both infinite",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
