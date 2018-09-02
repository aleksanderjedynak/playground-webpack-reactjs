const { resolve } = require("path");
const webpack = require("webpack");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(env) {

    var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;

    return {

        entry: {
            app: "./src/js/index.jsx",
            vendors: ["react", "react-dom","es6-promise/auto", "whatwg-fetch"]
        },

        output: {
            publicPath: dev ? "/dist/" : "",
            path: resolve(__dirname, "dist/"),
            filename: prod ? "[name].[chunkhash].js" : "[name].js"
        },

        devtool: prod ? "source-map" : "cheap-module-eval-source-map",

        module: {
            rules: [
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["react", "es2015"]
                        }
                    }
                },
                {
                    test: /main\.scss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader!sass-loader"
                    })
                },
                {
                    test: /\.scss$/,
                    exclude: /main\.scss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader?modules=true!sass-loader"
                    })
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "[name].[ext]"
                        }
                    }
                }
            ]
        },

        plugins: [
            new ExtractTextWebpackPlugin("main.css"),
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendors"
            })
        ]

    };

};