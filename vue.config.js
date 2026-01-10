const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/monkipling-shop' : '/',
  devServer: {
    port: 8080,
    allowedHosts: "all"
  }
})
