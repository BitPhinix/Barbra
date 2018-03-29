const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        content: "./src/page/app/app.tsx",

        inject: "./src/extension/app/app.tsx",
        background: "./src/extension/background.ts"
    },

    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist")
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: "./src/static/",
                to: "./"
            }
        ])
    ],

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        inline: true,
        hot: true,
        port: 9000
    }
};
