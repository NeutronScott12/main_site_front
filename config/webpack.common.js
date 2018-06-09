const { resolve } = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')
const htmlWebpack = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

extractSass = new ExtractTextPlugin({
	filename: process.env.NODE_ENV ? '[name].css' : '[name].[hash].css',
	allChunks: true,
	disable: process.env.NODE_ENV === 'development'
})

module.exports = {
	// context: resolve(__dirname, 'src'),
	target: 'web',
	entry: {
		vendor: [
			'react',
			'graphql',
			'formik',
			'react-apollo',
			'react-redux',
			'react-helmet',
			'react-dom',
			'react-quill',
			'redux',
			'recompose',
			'react-router-dom',
			'lodash',
			'downshift',
			'immutable',
			'yup'
		],
		path: './src/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: resolve(__dirname, '..', 'dist'),
		publicPath: '/',
		chunkFilename: '[id].chunk.js'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				test: /\.(css|scss)$/,
				use: extractSass.extract({
					use: ['css-loader', 'sass-loader'],
					// use style-loader in development
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				use: [
					{
						loader: 'file-loader'
					}
				]
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ['ts-laoder']
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.mjs', '.tsx', '.ts', '.js', '.jsx']
	},
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'async',
	// 		minSize: 30000,
	// 		minChunks: 1,
	// 		maxAsyncRequests: 5,
	// 		maxInitialRequests: 3,
	// 		automaticNameDelimiter: '~',
	// 		name: true,
	// 		cacheGroups: {
	// 			vendors: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				priority: -10
	// 			},
	// 			default: {
	// 				minChunks: 2,
	// 				priority: -20,
	// 				reuseExistingChunk: true
	// 			}
	// 		}
	// 	}
	// },
	plugins: [
		new htmlWebpack({
			template: resolve(__dirname, '../src/index.html')
		}),
		extractSass,
		// extractSass,
		// new webpack.optimize.AggressiveSplittingPlugin({
		// 	minsize: 3000000,
		// 	maxsize: 5000000
		// }),
		new ManifestPlugin()
		// new FaviconsWebpackPlugin('favicon.png')
	]
}

// test: /\.css$/,
// 				include: /node_modules/,
// 				use: ExtractTextPlugin.extract({
// 					fallback: 'style-loader',
// 					use: [
// 						{ loader: 'postcss-loader' },
// 						{
// 							loader: 'css-loader',
// 							options: {
// 								// If you are having trouble with urls not resolving add this setting.
// 								// See https://github.com/webpack-contrib/css-loader#url
// 								url: false,
// 								minimize: true,
// 								sourceMap: true
// 							}
// 						},
// 						{
// 							loader: 'resolve-url'
// 						},
// 						{
// 							loader: 'sass-loader',
// 							options: {
// 								sourceMap: true
// 							}
// 						}
// 					]
// 				})
