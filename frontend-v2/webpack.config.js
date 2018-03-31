const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {

    stats: {
        // Configure the console output
        errorDetails: true, //this does show errors
        colors: true,
        modules: true,
        reasons: true
    },
    
    entry: {
        "extension/js/extension": "./src/extension/app/app.tsx",
        "resources/sidebar": "./src/sidebar/app/app.tsx"
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },

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
