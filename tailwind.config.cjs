/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['"NeueMontrealMono"', 'sans-serif'],
			serif: ['"EditorialNew"', 'serif']
		},
		colors: {
			'blue': '#0000ff',
			'black': '#000',
			'white': '#fff'
		},
	},
	plugins: [],
}