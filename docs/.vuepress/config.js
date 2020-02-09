module.exports = {
  base: '/',
  title: 'Yuo MyBlog',
  description: 'Yuo MyBlog - Practice blog',
  port: '8000',
  dest: 'build',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Blog', link: '/blog/' }
    ],
    sidebar: [
      ['/', 'Home'],
      '/about/',
      '/blog/',
    ]
  }
};