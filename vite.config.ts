import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/node_modules/],
    }),
  ],
  root: path.join(__dirname, 'src', 'renderer'),
  publicDir: 'public',
  server: {
      port: 8085,
  },
  open: false,
  build: {
      outDir: path.join(__dirname, 'build', 'renderer'),
      emptyOutDir: true,
  },
});
