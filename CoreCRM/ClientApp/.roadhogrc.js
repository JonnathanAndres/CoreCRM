const nodeExternals = require("webpack-node-externals")

const BUILD_TYPE = process.env.BUILD_TYPE || 'client'
const entry = BUILD_TYPE === 'server' ? 'src/server-side/*.js' : 'src/client-side/*.js'

export default {
  entry: entry,
  outputPath: 'dist/' + BUILD_TYPE,
  multipage: BUILD_TYPE === 'client',
  extraBabelPlugins: [
    "transform-runtime",
  ],
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    production: Object.assign({
    }, (BUILD_TYPE === 'server' ? {
      library: "BootServer",
      libraryTarget: "umd",
    } : {})),
  }
};
