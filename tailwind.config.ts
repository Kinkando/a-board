import type { Config } from "tailwindcss";
import { content, plugin } from "flowbite-react/tailwind";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/module/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: {
          100: '#D8E9E4',
          300: '#2B5F44',
          500: '#243831',
        },
        golden: '#C5A365',
        text: '#191919',
        grey: {
          100: '#BBC2C0',
          300: '#939494',
        },
        success: '#49A569',
      },
    },
  },
  plugins: [
    plugin(),
  ],
} satisfies Config;
