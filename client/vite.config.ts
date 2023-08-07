import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
//@ts-ignore:next-line
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
  },
  plugins: [vue()],
});
