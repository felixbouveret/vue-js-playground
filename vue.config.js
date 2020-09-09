module.exports = {
  assetsDir: "assets",
  devServer: {
    port: 3000,
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader")
      .options({
        /* ... */
      });
  },
  css: {
    loaderOptions: {
      sass: {},
    },
  },
};
