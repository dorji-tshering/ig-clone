/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                instaBlue: '#0095f6',
            },
            screens: {
                'xs': '360px'
            },
            boxShadow: {
                searchShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
            }
        }, 
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
        require('tailwind-scrollbar-hide'),
        require("flowbite/plugin")
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
}
