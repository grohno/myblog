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
    ],
  }
  //head: [
  //    ['script', { src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js' }],
  //    ['script', { src: '/js/jquery.bxslider.js' }],
  //   ['script', { src: '/js/script.js' }],
  //]
};