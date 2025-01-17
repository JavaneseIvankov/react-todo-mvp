/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
   content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
   theme: {
      extend: {
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
         },
         colors: {
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
               gradient: 'var(--primary-gradient)',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'var(--accent-foreground)',
            },
            border: 'hsl(var(--border))',
         },
         fontSize: {
            base: '18px',
         },
         fontFamily: {
            josefin: ['Josefin Sans', 'sans-serif'],
         },
      },
   },
   plugins: [],
};
