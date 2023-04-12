const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './client/index.html',
        }),
    ],
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'client'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            //   {
            //     test: /\.png|svg|jpg|gif$/,
            //     use: [
            //         'file-loader'
            //     ],
            //  },
            // {
            //     test: /\.png|svg|jpg|gif$//,
            //     type: 'asset/resource'
            //   }
        ],
    },
    devServer: {
        static: [path.join(__dirname, 'client')],

        // proxy setting to be included
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                secure: false,
            },
        },
        // fallback to root for other urls
        historyApiFallback: true,
    },
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
    },
};
