import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// La clé GEMINI_API_KEY n'est volontairement pas injectée ici : elle n'est lue que par api/chat.ts côté serveur
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
