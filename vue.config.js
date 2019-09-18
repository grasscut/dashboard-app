module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://intra.proekspert.ee/wiki/rest/proekspert/1.0',
        pathRewrite: {'^/api' : ''},
        secure: true,
      },
      '/rest': {
        target: 'https://intra.proekspert.ee/wiki',
        secure: true,
      },
      '/jkeskus/wiki': {
        target: 'https://intra.proekspert.ee',
        secure: true,
      },
    },
  },
};
