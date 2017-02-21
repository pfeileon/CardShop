const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    return {
        entry: {
            app: './src/app/main.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [new HtmlWebpackPlugin({
            template: './src/app/index.html'
        })],
        resolve: {
            extensions: ['.ts', '.js', '.scss']
        },
        module: {
            rules: [{
                test: /\.ts$/,
                loader: 'awesome-typescript-loader?sourceMap'
            }, {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]'
            }]
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            stats: {
                colors: true
            },
            proxy: {

            }
        }
    }
};