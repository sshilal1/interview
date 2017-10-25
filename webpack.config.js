module.exports = {
	entry : {
		app : "./app.js",
		reactstoreapp : "./react-store-app.js"
	},
	output : {
		filename : "./public/[name]bundle.js"
	},
	module: {
	  rules: [
	    { 
	    	test: /\.js$/,
	    	exclude: /node_modules/,
	    	loader: "babel-loader",
	    	options: {
	    		presets : ['env', 'react']
	    	}
	    }
	  ]
	},
	watch : true
}