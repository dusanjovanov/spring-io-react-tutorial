const path = require('path');

module.exports = {
	entry : path.resolve(__dirname, 'src/main/js/index.jsx'),
	output : {
		path : path.resolve(__dirname, "src/main/resources/static/build"),
		filename : "bundle.js"
	},
	mode : "development",
	devtool : "sourcemaps",
	cache : true,
	module : {
		rules : [ {
			test : /\.jsx?$/,
			include : path.resolve(__dirname, "src"),
			loader : 'babel-loader'
		} ]
	}
}