const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cssOutputPath = isProduction ? 'styles/app.[hash].css' : 'styles/app.css';

const ExtractSASS = new ExtractTextPlugin(cssOutputPath);
const port = 3001;
const srcPath = path.join(__dirname, './../../src/client');
const distPath = path.join(__dirname, './../../dist/static');
const output = {
  path: distPath,
  filename: isProduction ? '[name].[hash].js' : '[name].js',
  chunkFilename: '[id].[chunkhash].js',
};
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
  }),
];
const rules = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    include: srcPath,
    use: ['babel-loader', 'ts-loader'],
  },
];
const webpackConfig = {
  context: srcPath,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      srcPath,
      'node_modules',
    ],
  },
  plugins,
  module: {
    rules,
  },
};


webpackConfig.output = output;

if (isProduction) {
  webpackConfig.entry = [path.join(srcPath, 'app/index')];
  webpackConfig.devtool = 'source-map';
  output.publicPath = '/static';
  rules.push({
    test: /\.scss$/,
    loader: ExtractSASS.extract(['css-loader', 'sass-loader']),
  });
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    ExtractSASS
  );
} else {
  webpackConfig.entry = [`webpack-dev-server/client?http://localhost:${port}`, path.join(srcPath, 'app/index')];
  webpackConfig.devtool = 'cheap-eval-source-map';
  rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  });
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
  webpackConfig.devServer = {
    contentBase: path.join(distPath, './'),
    hot: true,
    port,
    inline: true,
    progress: true,
    historyApiFallback: true,
    proxy: {
      '/v1/api': 'http://127.0.0.1:8080',
    },
  };
}

module.exports = webpackConfig;
