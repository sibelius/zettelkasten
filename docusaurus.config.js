import {themes} from 'prism-react-renderer';
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
export default {
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
          href: 'https://www.patreon.com/sibelius',
          position: 'right',
          className: 'patreon-logo',
          html: '<img src="img/patreon-logo.png" alt="github-icon" width="20px" style="margin-top: 7px"/>',
        },
        {
          href: 'https://github.com/sponsors/sibelius',
          position: 'right',
          className: 'github-sponsor-logo',
          html: '<img src="img/gh-sponsor.svg" alt="github-icon" width="25px" style="margin-top: 7px"/>',
        },
        {
          href: 'https://github.com/sibelius/zettelkasten',
          position: 'right',
          className: 'github-icon-header',
          html: '<img src="img/github-icon.svg" alt="github-icon" width="20px" />',
        },
      ],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
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
        gtag: {
          trackingID: 'G-3SK393X2BR',
          anonymizeIP: true,
        },
      },
    ],
  ],
};
