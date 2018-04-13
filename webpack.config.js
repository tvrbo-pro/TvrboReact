const path = require("path");
const config = require("./app/config/server");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	context: path.resolve(__dirname, "app"),
	entry: [
		"react-hot-loader/patch",
		// activate HMR for React

		"webpack-dev-server/client?http://127.0.0.1:8080",
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		"webpack/hot/only-dev-server",
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		"./client.jsx"
	],
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
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
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
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"global.WEBPACK": JSON.stringify(true),
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			"config.DEBUG": JSON.stringify(true),
			"config.APP_NAME": JSON.stringify(config.APP_NAME),
			"config.SERVER_URL": JSON.stringify(config.SERVER_URL),
			"config.GOOGLE_ANALYTICS_CODE": JSON.stringify(
				config.GOOGLE_ANALYTICS_CODE
			)
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(), // enable HMR globally
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	devServer: {
		hot: true,
		proxy: {
			"*": "http://127.0.0.1:" + config.HTTP_PORT
		},
		host: "127.0.0.1"
	}
};
