var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8888');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  entry: {
    helloWorld: getEntrySources([
        './src/js/helloWorld.js'
    ])
  },
  output: {
    publicPath: 'http://localhost:8888/',
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 8888,
    // contentBase: path.join(__dirname, "dist"),
    publicPath: "http://localhost:8888/"
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            loaders: ['react-hot', 'jsx', 'babel'],
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),

    new CopyWebpackPlugin([
      { from: 'src/html/index.html', to: 'index.html' },
      { from: 'src/components', to: 'components' }
    ])
  ]
};
