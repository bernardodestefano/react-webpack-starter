const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
    flow
} = require('lodash/fp');
const {
    join,
    resolve
} = require('path');

const dir = flow(resolve, join);

const css = {
    test: /(\.scss$)/,
    use: [{
        loader: "style-loader"
    }, {
        loader: "css-loader",
        options: {
            sourceMap: true
        }
    }, {
        loader: "sass-loader",
        options: {
            sourceMap: true
        }
    }]
};


const js = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
    }
};

/*
const js = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        options: {
            "presets": [
                ["env", {
                    "targets": {
                        "chrome": 52,
                        "browsers": ["last 2 versions", "safari 7"]
                    }
                }]
            ]
        }
    }
};
*/

module.exports = {
    context: __dirname,
    entry: {
        app: dir('src', 'js', 'index.js')
    },
    devtool: 'source-map',
    devServer: {
        contentBase: 'dist',
        hot: true
    },
    output: {
        path: dir(__dirname, 'dist'),
        filename: '[name].bundle.js',
        //publicPath: ''
    },
    module: {
        rules: [css, js]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            template: dir('src', 'index.html')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
