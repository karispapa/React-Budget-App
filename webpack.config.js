const path = require ('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader', // use babel-loader for transpiling 
      test: /\.(js|.jsx)$/, // test for only js and jsx files
      exclude: '/node_modules'
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'] 
    },{
      test: /\.(png|svg|jpeg)/,
      use: ['file-loader']
    }
  ]
  },
  mode: 'development',
 devtool: 'cheap-module-eval-sourcemap',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  }

}

/*
When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses. 
Enable devServer.historyApiFallback by setting it to true:
*/