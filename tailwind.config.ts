import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class", '[data-mode="developer"]'],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: "var(--background)",
  			foreground: "var(--foreground)",
  			primary: {
  				DEFAULT: "var(--primary)",
  				foreground: "var(--background)"
  			},
  			accent: {
  				DEFAULT: "var(--accent)",
  				foreground: "var(--background)"
  			}
  		},
  		fontFamily: {
  			sans: ["var(--font-sans)", "sans-serif"],
  			display: ["var(--font-display-current)", "serif"],
  			serif: ["var(--font-body-current)", "serif"],
  			mono: ["var(--font-mono-dev)", "monospace"]
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)"
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
