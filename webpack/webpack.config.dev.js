const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config');

const BUILD_ENV = process.env.BUILD_ENV;
const config = {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),
  ],
  devServer: {
    contentBase: base.output.path,
    port: 3000,
    index: `index.${BUILD_ENV}.html`,
    hot: true,
    https: false,
    historyApiFallback: {
      index: 'index.dev.html',
    },
    proxy: {
      '/api': {
        target: `http://ssefi-nodeserver.${BUILD_ENV}.sumscope.com:5100`,
        // target: 'http://localhost:5001/',
        pathRewrite: {
          '^/api/': '/api/'
        }
      },
      '/web-library': {
        target: `http://service-ssefi.${BUILD_ENV}.sumscope.com:7998`
      },
      '/demo/api': {
        target: 'http://ias.idbhost.com',
        pathRewrite: {
          '^/demo/api/': '/api/'
        },
      },
      '/demo2/users': {
        target: 'http://192.168.1.212:5678',
        pathRewrite: {
          '^/demo2/users': '/users'
        },
      },
    },
  },
};

module.exports = merge(base, config);
