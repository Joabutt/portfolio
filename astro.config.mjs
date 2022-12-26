import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import sitemap from "@astrojs/sitemap";


import vercel from "@astrojs/vercel/serverless"; // https://astro.build/config


// https://astro.build/config
export default defineConfig({
  site: 'https://joabutt.dev',
  trailingSlash: 'always',
  vite: {
    plugins: [yaml()]
  },
  integrations: [sitemap()],
  output: "server",
  adapter: vercel()
});