/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}', // scan all components
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'), // optional
    ],
};
