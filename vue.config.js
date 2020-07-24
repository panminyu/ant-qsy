module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 静态资源访问路径
  devServer: {
    proxy: {
      '/api': {
        target: 'http://qsy.officelinking.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
