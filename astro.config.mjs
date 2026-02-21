// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Astro configuration with React integration and Tailwind CSS
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});