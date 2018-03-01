module.exports = {
  html: true,
  images: false,
  fonts: false,
  static: true,
  svgSprite: false,
  ghPages: false,
  stylesheets: true,

  javascripts: {
    entry: {
      app: ['./app.js']
    }
  },

  browserSync: {
    server: {
      baseDir: 'public'
    }
  },

  production: {
    rev: false
  }
};

