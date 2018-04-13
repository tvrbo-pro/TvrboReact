const path = require("path");
const config = require("./app/config/server");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // Independent CSS file

const webpackConfig = {
	mode: "production",
	context: __dirname + "/app",
	entry: ["./client.jsx"],
	output: {
		path: path.join(__dirname, "public"),
		filename: "bundle.js",
		publicPath: "/"
	},
	resolve: {
		modules: [path.resolve(__dirname, "node_modules")],
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			// COMPONENTS
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [["env", { modules: false }], "stage-1"],
					plugins: ["react-hot-loader/babel" /*, "external-helpers"*/],
					compact: true
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [["env", { modules: false }], "react", "stage-1"],
					plugins: [
						"transform-decorators-legacy",
						"react-hot-loader/babel" /*, "external-helpers"*/
					],
					compact: true
				}
			},

			// STYLES
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "less-loader"],
					publicPath: "/"
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader"],
					publicPath: "/"
				})
			},

			// MEDIA
			{
				test: /\.(jpe?g|png|gif|svg|jpg)$/i,
				use: ["url-loader?limit=5000", "img-loader"]
			},
			{
				test: /\.(woff|woff2)$/,
				use: ["file-loader?prefix=fonts/"]
			},
			{
				test: /\.ttf$/,
				use: ["file-loader?prefix=fonts/"]
			},
			{
				test: /\.eot$/,
				use: ["file-loader?prefix=fonts/"]
			},
			{
				test: /\.json$/,
				use: "json-loader"
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"global.WEBPACK": JSON.stringify(true),
			"process.env.NODE_ENV": '"production"',
			NODE_ENV: '"production"',
			"config.DEBUG": JSON.stringify(false),
			"config.APP_NAME": JSON.stringify(config.APP_NAME),
			"config.SERVER_URL": JSON.stringify(config.SERVER_URL)
		}),
		new ExtractTextPlugin({
			filename: "[name].bundle.css",
			allChunks: true
		})
	]
};

module.exports = webpackConfig;
