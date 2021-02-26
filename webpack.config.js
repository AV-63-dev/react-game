const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                auto: /\.modules\.\w+$/i,
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: ['url-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Game',
            template: path.resolve(__dirname, 'src/template.html'),
            filename: 'index.html',
        })
    ],
    devServer: {
        port: 3000,
    },
   // devtool: 'source-map',
};