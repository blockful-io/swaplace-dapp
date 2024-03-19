import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./styles/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ["var(--font-onest)"],
      },
      boxShadow: {
        sidebarLight: "0px 0px 6px 1px rgba(0, 0, 0, 0.30)",
        sidebarDark: "0px 0px 12px 1px rgba(0, 0, 0, 0.40)"
      },
    },
  },
  plugins: [],
};
export default config;
