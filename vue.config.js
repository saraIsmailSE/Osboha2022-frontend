module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.BASE_URL : "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
    pwa: {
      name: "Osboha180 Platform",
      themeColor: "#208040",
      msTileColor: "#208040",
      appleMobileWebAppCapable: "yes",
      appleMobileWebAppStatusBarStyle: "#208040",
      manifestOptions: {
        display: "standalone",
      },
    },
  },
};
