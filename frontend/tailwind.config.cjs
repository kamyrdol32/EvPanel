/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,jsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                'primary': '#0F172A',
                'secondary': '#ffffff',
                'dark_primary': '#0F172A',
                'dark_secondary': '#1E293B',
                'accent': '#7477FF',
            }
        },
    },
    plugins: [],
}
