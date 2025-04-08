/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
	  container: {
		center: true,
		padding: "15px",
	  },
	  screens: {
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px"
	  },
	  extend: {
		fontFamily: {
		  primary: ["var(--font-press-start)", "monospace"]
		},
		colors: {
		//   background: 'var(--background)',
		//   foreground: 'var(--foreground)'
		primary: "#1c1c22",
		
		accent: {
			default: "var(--accent-default)",
			hover: "var(--accent-hover)",
            active: "var(--accent-active)",
            shadow: "var(--accent-shadow)",
            glow: "var(--accent-glow)"
		},
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		}
	  }
	},
	plugins: [require("tailwindcss-animate")]
  }
