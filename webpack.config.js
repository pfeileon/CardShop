const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = function (env) {
    return {
        entry: {
            app: './src/app/main.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jquery: "jQuery"
            }),
            new ExtractTextPlugin('styles.css'),
            new HtmlWebpackPlugin({
                template: './src/app/index.html',
                inject: 'head'
            })
        ],
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
            }
        },
        module: {
            rules: [
                {
                    test: /bootstrap.+\.(jsx|js)$/,
                    use: 'imports-loader?jQuery=jquery,$=jquery'
                }, {
                    test: /\.ts$/,
                    use: 'awesome-typescript-loader?sourceMap'
                }, {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
                    })
                }, {
                    test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
                    use: 'file-loader?name=[name].[ext]'
                }, {
                    test: /\.(png|jpg|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 15000,
                            name: '[name].[ext]',
                        },
                    }
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