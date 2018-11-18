const prod = process.env.NODE_ENV === 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const hash = {
    js: prod ? '[chunkhash].' : '',
    css: prod ? '[contenthash].' : '',
};
module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: `[name].${hash.js}js`,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin('public', {
            dry: !prod,
        }),
        new MiniCssExtractPlugin({
            filename: `style.${hash.css}css`,
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
    devtool: 'source-map',
    performance: { hints: false },
    resolve: {
        extensions: ['*', '.js', '.jsx', 'scss'],
    },
};
