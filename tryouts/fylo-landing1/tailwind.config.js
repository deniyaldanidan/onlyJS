/** @type {import('tailwindcss').Config} */
const plugin =  require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '390px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1400px'
    },
    extend: {
      colors: {
        dBlueIntro: 'hsl(217, 28%, 15%)', // For Intro and email signUp BG
        dBlueMain: 'hsl(218, 28%, 13%)', // Main Background
        dBlueFooter: 'hsl(216, 53%, 9%)', // Footer Background
        dBlueTestimon: 'hsl(219, 30%, 18%)', // Testimonials Background
        cyanCTA: 'hsl(176, 68%, 64%)', // For CTA
        blueCTA: 'hsl(198, 60%, 50%)', // For CTA
      }
    },
  },
  plugins: [
    plugin(function({ addComponents }){
      addComponents({
        '.btn-grad': {
          'background': 'rgb(101, 226, 217)',
          'background': 'linear-gradient(142deg, rgba(101,226,217,1) 0%, rgba(51,158,204,1) 100%)',
          '&:hover': {
            'background': 'hsl(176, 68%, 64%)'
          }
        },
      })
    })
  ],
}

// Gradient CTA btns
// background: rgb(101,226,217);
// background: linear-gradient(142deg, rgba(101,226,217,1) 0%, rgba(51,158,204,1) 100%);