import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Сайт публикуется в корне домена sm1-tee.github.io
// Репозиторий вида <owner>.github.io отдаётся из корня, поэтому base = '/'
const githubRepository = process.env.GITHUB_REPOSITORY ?? '';
const [githubOwner, githubRepo] = githubRepository.split('/');

const isUserSiteRepo = !githubRepo || githubRepo.toLowerCase().endsWith('.github.io');
const base = isUserSiteRepo ? '/' : '/' + githubRepo;
const host = (githubOwner || 'sm1-tee').toLowerCase() + '.github.io';
const site = 'https' + '://' + host;

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin')
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
