const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});
const { flow } = require('lodash/fp');
const { join, resolve } = require('path');

const dir = flow(resolve, join);

const img = {
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
    	{
    		loader: 'file-loader',
    		options: {
    			name: '[name].[ext]',
    			outputPath: 'img/',
    			publicPath: 'img/'
    		}
    	}
    ]
}

const html = {
	test: /\.html$/,
	use: ['html-loader']
}

const css = {
    test: /(\.scss$)/,
    exclude: /(node_modules)/,
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
            presets: ['env']
        }
    }
};

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
        rules: [css, js, img, html]
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
