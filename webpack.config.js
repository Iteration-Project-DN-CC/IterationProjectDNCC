const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, './client/index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/index.html',
		}),
	],
	mode: 'development',
	module: {
		rules: [
			{
				test: /.jsx?/, // Test for JavaScript and JSX files
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/i, // Test for CSS files
				exclude: /node_modules/,
				use: [
					'style-loader', // Injects styles into the DOM
					'css-loader', // Resolves CSS imports
					'postcss-loader', // Processes Tailwind and other PostCSS plugins
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i, // Test for image files
				type: 'asset/resource', // Handle images as assets
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '/build'),
		},
		compress: true,
		port: 8080,
		hot: true, // Enables hot module replacement
		proxy: [
			{
				context: ['/recipe', '/ingredients'], // Array of API endpoints to proxy
				target: 'http://localhost:3000', // Backend server
				changeOrigin: true,
			},
		],
	},
};
