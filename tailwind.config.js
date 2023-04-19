/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            gridTemplateRows: {
                10: "repeat(10, minmax(0, 1fr))"
            },
            aspectRatio: {
                "1/2": "1 / 2"
            },
            colors: {
                hero: "#00F0F0",
                "blue-ricky": "#0000F0",
                "orange-ricky": "#F0A000",
                "smash-boy": "#F0F000",
                "cleveland-z": "#F00000",
                "rhode-island-z": "#00F000",
                teewee: "#A000F0"
            }
        }
    },
    plugins: []
};
