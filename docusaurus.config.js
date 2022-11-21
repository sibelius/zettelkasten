const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Sibelius Zettelkasten',
  tagline: 'Sibelius Zettelkasten - Unfinished thoughts',
  url: 'http://sibelius.github.io',
  baseUrl: '/zettelkasten',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'sibelius', // Usually your GitHub org/user name.
  projectName: 'zettelkasten', // Usually your repo name.
  trailingSlash: false,
  plugins: [
    [require.resolve('@cmfcmf/docusaurus-search-local'), {
      indexBlog: false,
    }]
  ],
  themeConfig: {
    navbar: {
      title: 'Sibelius Zettelkasten',
      logo: {
        alt: 'Sibelius Zettelkasten',
        src: 'img/favicon.ico',
      },
      items: [
        {
          to: 'tags',
          position: 'right',
          label: 'Tags',
        },
        {
          href: 'https://twitter.com/sseraphini',
          position: 'right',
          label: '🐦',
        },
        {
          href: 'https://github.com/sibelius',
          position: 'right',
          label: '🐙',
        },
        {
          href: 'https://github.com/sibelius/zettelkasten',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    footer: {
      links: [],
      copyright: 'Copyright © Sibelius Seraphini',
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          routeBasePath: '/',
          path: './docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            return `https://github.com/sibelius/zettelkasten/edit/main/${versionDocsDirPath}/${docPath}`;
          },
          editCurrentVersion: true,
          remarkPlugins: [require('mdx-mermaid')],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
