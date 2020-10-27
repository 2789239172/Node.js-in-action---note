const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['transform-react-jsx']
        }
      }
    }
    ]
  },
  
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
}
