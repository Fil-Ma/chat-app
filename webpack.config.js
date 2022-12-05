const path = require("path");
const Dotenv = require('dotenv-webpack');
require("dotenv").config();

const CLIENT_PORT = process.env.REACT_APP_PORT;

module.exports = {
    output: {
        path: path.join(__dirname, "./public/build"),
        filename: "bundle.js",
        publicPath: "/"
    },
    entry: path.resolve(__dirname, "./src/index.js"),
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        port: CLIENT_PORT,
        static: path.join(__dirname, "./public"),
        historyApiFallback: true,
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: [".js", ".css", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    },
    plugins: [
        new Dotenv() 
    ]
}