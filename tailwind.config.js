/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',  // Small devices, como smartphones
        'md': '768px',  // Dispositivos médios, como tablets
        'lg': '1024px', // Dispositivos grandes, como laptops
        'xl': '1280px', // Dispositivos extra grandes, como monitores de desktop
      },
    },
  },
  plugins: [],
}