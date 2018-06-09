const webpack = require('webpack')
const { resolve } = require('path')
const htmlWebpack = require('html-webpack-plugin')
const common = require('./webpack.common.js')
const webpackMerge = require('webpack-merge')
const webpackClosureCompiler = require('webpack-closure-compiler')

module.exports = webpackMerge(common, {
	mode: 'production',
	devtool: 'source',
	plugins: [
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(true)
		}),
		new HtmlWebpack({
			inject: true,
			template: '../public/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpackClosureCompiler({
			concurrency: 4
		}),
		new webpack.LoaderOptionsPlugin({
			htmlLoader: {
				minimize: false
			}
		})
	]
})
