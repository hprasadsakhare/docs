import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://docs.truenetwork.io'
  },

  head: [['link', { rel: 'icon', href: '/assets/logo.png' }]],
  title: "True Network's Docs",
  description: "True Network provides the infrastructure for dApps to give on-chain attestations & build reptuation systems easily in minutes.",
  themeConfig: {
    logo: '/assets/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quickstart', link: '/quickstart' },
      { text: 'Join Community 💬', link: 'https://at.truenetwork.io/community' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Quickstart ⚡️', link: '/quickstart' },
          { text: 'About Protocol', link: '/protocol/overview' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/truenetworkio' },

      { icon: 'twitter', link: 'https://x.com/truenetworkio' },

      { icon: 'linkedin', link: 'https://linkedin.com/company/truenetwork' }
    ],
    footer: {
      message: 'The Reputation Layer of the Internet',
      copyright: 'Copyright © 2024 Jupiter Innovations Lab Inc'
    }
  }
})
