module.exports = {
  baseUrl: './',
  devServer: {
    proxy: {
      '/Handler': {
        target: 'http://t.vipfgj.com',       // 测试地址
        ws: true,
        changeOrigin: true
      }
    }
  }
}