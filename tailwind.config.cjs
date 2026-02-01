/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

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
		colors: {
			...colors,
			'black': '#050517',
			'white': '#F9F9F9',
			'purewhite': '#FFFFFF',
			'offwhite': '#F3EFE0',
			'almostwhite': '#F9F7F0',
			'gray': '#8A817C',
			'lightgray': "#e8e4d5",
			'verylightgray': "#ebe7d8",
			'ecru': "#A69658",
			'accent-yellow': '#FEF08A',
			'accent-green': '#04724D',
			'accent-blue': '#007FFF',
			'dark-bg': '#050517',
			'dark-surface': '#0a0a1a',
			'dark-surface-hover': '#14142a',
			'dark-border': '#1e1e3a',
			'dark-text': '#F9F9F9',
			'dark-text-muted': '#a8a8a8'
		},
		extend: {
			borderColor: {
				DEFAULT: '#9f9fa9',
			},
		}
	},
	plugins: [],
}