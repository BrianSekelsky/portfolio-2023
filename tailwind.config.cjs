/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			mono: ['"JetBrainsMono", "ui-monospace"', 'sans-serif'],
			serif: ["PPRightGroteskMono", "Arial", "sans-serif"],
			sans: ['"Inter", "Arial"', 'sans-serif']
		},
		colors: {
			'blue': '#0000ff',
			'black': '#000',
			'white': '#fff',
			'offwhite': '#f5f5f5',
			'gray': '#666'
		},
		maxWidth: {
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
		},
		boxShadow: {
			'md': '0 0 10px 0 rgba(0,0,0,0.45) inset;',
		}
	},
	plugins: [],
}