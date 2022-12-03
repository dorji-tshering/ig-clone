/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                instaBlue: '#0095f6',
                blue: {
                    600: '#0095f6'
                }
            },
            screens: {
                'xs': '360px'
            }
        }, 
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
        require('tailwind-scrollbar-hide'),
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
}
