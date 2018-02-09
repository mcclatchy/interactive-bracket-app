module.exports = {
  html: true,
  images: true,
  fonts: true,
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

