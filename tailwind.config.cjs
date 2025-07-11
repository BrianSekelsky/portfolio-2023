/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			// mono: ['"IBM Plex Mono", "ui-monospace"', 'sans-serif'],
			serif: ["freighttextcmp-pro", "ui-monospace", "sans-serif"],
			sans: ["Inter Variable", "Arial", 'sans-serif']
		},
		colors: {
			'blue': '#0000ff',
			'black': '#212427',
			'white': '#fff',
			'offwhite': '#f5f5f5',
			'gray': '#666',
			'lightgray': "#bcbcbc",
			'verylightgray': "#eeeeee",
			'ecru': "#A69658"
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
		borderColor: {
			DEFAULT: '#212427',
			'blue': "#0000ff",
			'lightgray': '#bcbcbc'
		},
		shadow: {
			'none': '0px',
		}
		// fontSize: {
		// 	'xs': '.6rem',
		// 	'sm': '.775rem',
		// 	'base': '1rem',
		// 	'lg': '1.125rem',
		// 	'xl': '1.25rem',
		// 	'2xl': '1.5rem',
		// 	'3xl': '1.875rem',
		// 	'4xl': '2.25rem',
		// 	'5xl': '3rem',
		// 	'6xl': '4rem',
		// 	'7xl': '5rem',
		// },
	},
	plugins: [],
}