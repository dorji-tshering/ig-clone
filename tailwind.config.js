/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'instaBlue': '#0095f6'
            }
        }, 
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
        require('tailwind-scrollbar-hide'),
        require('flowbite/plugin'),
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
}
