/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['"NeueMontrealMono", "Arial"', 'sans-serif'],
			serif: ['"NeueMontreal", "Arial"', 'serif']
		},
		colors: {
			'blue': '#0000ff',
			'black': '#000',
			'white': '#fff'
		},
		maxWidth: {
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
		}
	},
	plugins: [],
}