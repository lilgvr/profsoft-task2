const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name][contenthash].js',
        clean: true
    },
    performance: {
        hints: false
    },
    devServer: {
        port: 3000,
        hot: true,
        compress: true,
        static: {
            directory: path.join(__dirname, 'build')
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'raw-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        })
    ]
}
