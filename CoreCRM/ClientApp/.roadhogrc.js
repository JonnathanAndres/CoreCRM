const ExtractTextPlugin = require("extract-text-webpack-plugin");

export default {
  "entry": "src/views/*.js",
  "extraBabelPlugins": [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": "css" }]
  ],
  "multipage": false,
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ],
      "proxy": {
        "/api": {
          "target": "http://jsonplaceholder.typicode.com/",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
      }
    },
    "production": {
      "extraBabelPlugins": [],
      "library": "App",
      "libraryTarget": "umd"
    }
  }
};
