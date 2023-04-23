const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = ({
                      mode = "development"
                  } = {}) => {
    const app = "skyInventry";
    const src = path.resolve(__dirname, "src");
    const output = path.resolve(__dirname, "dist", app);
    const is_development = mode === "development";

    const plugins = [];


    if (!is_development)
        plugins.unshift(new CleanWebpackPlugin());

    return {
        entry: path.resolve(src, "index.js"),
        output: {
            path: output,
        },
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:7000',
                    router: () => 'http://localhost:8000',
                }
            },
            port: 7000,
            historyApiFallback: true
        },
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        name: "vendor",
                        enforce: true,
                        chunks: "initial"
                    }
                }
            },
            minimizer: [
                new TerserPlugin({parallel: true}),
                new OptimizeCSSAssetsPlugin({})
            ],
        },
        mode: "development",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /index\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.(css|scss)/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: ["sass-loader"]
                },
                {
                    test: /\.(svg|jpg|png|jpeg|webp|gif|eot|woff|ttf|ico|mp4|csv|pdf)/,
                    use: "file-loader"
                },
            ]
        },
        resolve: {extensions: [".js", ".json", ".jsx"]},
        plugins: [
            new MiniCssExtractPlugin({}),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "public", "index.html"),
            }),
        ],
    }

}
