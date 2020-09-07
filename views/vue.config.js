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
  ]
}