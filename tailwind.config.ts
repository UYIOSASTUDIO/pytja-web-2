import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            colors: {
                accent: "#F46623",
            },
        },
    },
    plugins: [],
};
export default config;