module.exports = {
  "outputDir": "C:\\Users\\tomos\\OneDrive\\Documents\\discovernow-3\\server\\public",
  "devServer": {
    "proxy": {
      "^/api/": {
        "target": "http://localhost:5000",
        "ws": true,
        "changeOrigin": true
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `$darkGreen: #264653; $green: #2a9d8f; $yellow: #e9c46a; $orange: #f4a261; $darkOrange: #e76f51;`
      }
    }
  }
}