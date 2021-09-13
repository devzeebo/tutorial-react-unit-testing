const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.join(__dirname, 'src');
const outputPath = path.join(__dirname, 'dist');

const forkTsPlugin = new ForkTsCheckerWebpackPlugin({
  eslint: {
    files: [
      './src/**/*.{ts,tsx,js,jsx}',
    ],
  },
});
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
});

module.exports = {
  mode: 'development',
  output: {
    pathinfo: false,
    path: path.resolve(outputPath),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    forkTsPlugin,
    htmlPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: root,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules|src\/stories/,
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false,
          },
        },
      },
    ],
  },
};
