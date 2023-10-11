/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			mono: ['"NeueMontrealMono", "ui-monospace"', 'sans-serif'],
			serif: ['"EditorialNew"', 'serif'],
			sans: ['"NeueMontreal", "Arial"', 'sans-serif']
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
		}
	},
	plugins: [],
}