const path = require("path");

module.exports = {
    output: {
        path: path.join(__dirname, "./public"),
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
        port: "3030",
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
            }
        ]
    }
}