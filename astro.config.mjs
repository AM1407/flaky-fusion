// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  prefetch: true,
  // Voeg i18n ondersteuning toe
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    routing: {
      prefixDefaultLocale: false // 'en' is op de root, 'nl' krijgt /nl/
    }
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});