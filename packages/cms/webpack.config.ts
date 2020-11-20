const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
    },
    devtool: "source-map",
    mode: "development",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        historyApiFallback: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["ts-loader"],
            },
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
            },
            {
                test: /\.html/,
                use: ["html-loader"],
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ],
}
