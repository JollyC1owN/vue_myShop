var path = require('path');
var node_modules = __dirname + '/node_modules'
var webpack = webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var precss = require('precss');


var config = {
	// Thanks Christian Alfoni: http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html#vendors
	addVendor: function (name, path, loader) {
		loader = loader || 0;
		this.resolve.alias[name] = path;
		this.module.loaders[loader].noParse.push(new RegExp(path));
	},
	entry: [
		'webpack-dev-server/client?http://localhost:9090/',
		'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'app/main.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	resolve: { alias: {} },
	devServer: {
		contentBase: 'build/'
	},
	module: {
		loaders: [
			{
				noParse: [],
				test: /\.jsx?$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&modules&importLoaders=1!postcss-loader')
			}
		]
	},
	postcss: function (webpack) {
		return [
			postcssImport({ addDependencyTo: webpack }),
			precss,
			autoprefixer
		];
	},
	plugins: [
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost:9090'
			},
			{
				reload: false
			}
		),
		// Set the name of the single CSS file here.
		new ExtractTextPlugin('main.css', { allChunks: true }),
		new webpack.HotModuleReplacementPlugin()
	]
};

config.addVendor('jquery', node_modules + '/jquery/dist/jquery.min.js');
config.addVendor('marked', node_modules + '/marked/lib/marked.js');

module.exports = config;
