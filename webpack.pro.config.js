const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    plugins: [new CleanWebpackPlugin(['dist'])],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};