const nodeExternals = require("webpack-node-externals")

const BUILD_TYPE = process.env.BUILD_TYPE || 'client'
const entry = BUILD_TYPE === 'server' ? 'src/server-side/*.js' : 'src/client-side/*.js'

export default {
  entry: entry,
  outputPath: 'dist/' + BUILD_TYPE,
  extraBabelPlugins: [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": "css" }]
  ],
  multipage: BUILD_TYPE === 'client',
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr"
      ],
      proxy: {
        "/api": {
          "target": "http://jsonplaceholder.typicode.com/",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
      }
    },
    production: {
      "library": "App",
      "libraryTarget": "umd",
      "externals": [nodeExternals()]
    }
  }
};
