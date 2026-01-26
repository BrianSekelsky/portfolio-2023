/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			serif: ["freight-text-pro", "sans-serif"],
			sans: ["neue-haas-unica", "Helvetica", 'sans-serif'],
			mono: ["freight-macro-pro", "Helvetica"]
		},
		maxWidth: {
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
		},
		borderRadius:
		{
			'Default': '0.25rem',
			'sm': '0.2rem',
			'md': '0.3rem',
			'lg': '1rem',
			'xl': '2rem',
			'2xl': '3rem',
			'full': '100rem',
			'none': '0px',
		},
		extend: {
			colors: {
				'black': '#212427',
				'white': '#fff',
				'offwhite': '#f5f5f5',
				'gray': '#8A817C',
				'lightgray': "#ededed",
				'verylightgray': "#ededed",
				'ecru': "#A69658",
				'dark-bg': '#0f1214',
				'dark-surface': '#1a1d21',
				'dark-surface-hover': '#232629',
				'dark-border': '#2d3135',
				'dark-text': '#e8e8e8',
				'dark-text-muted': '#a8a8a8'
			},
			borderColor: {
				DEFAULT: 'oklch(70.5% 0.015 286.067)',
			},
		}
	},
	plugins: [],
}