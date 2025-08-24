/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // This tells Tailwind to scan all your Blade template files
        "./resources/**/*.blade.php",

        // This tells Tailwind to scan all your React/JS files
        "./resources/js/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};