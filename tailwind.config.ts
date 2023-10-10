import {nextui} from "@nextui-org/react";
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      height: {
        'hero': 'calc(100vh - 64px)'
      },
      colors: {
        'blue-start': '#5EA2EF',
        'blue-end': '#0072F5'
      },
      backgroundColor: {
        'dark-section': 'rgb(24, 24, 27)',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
export default config
