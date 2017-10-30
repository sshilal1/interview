module.exports = {
	entry : {
		'public/' : "./app.js",
		'react-store-public/' : "./react-store-app.js"
	},
	output : {
		filename : "[name]bundle.js"
	},
	module: {
	  rules: [
	    { 
	    	test: /\.js$/,
	    	exclude: /node_modules/,
	    	loader: "babel-loader",
	    	options: {
	    		presets : ['env', 'react', "es2015"]
	    	}
	    }
	  ]
	}
}
