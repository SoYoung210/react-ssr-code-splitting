module.exports = {
  "presets": [
    "@babel/typescript",
    "@babel/react"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    "lodash",
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ],
    "react-hot-loader/babel",
    '@loadable/babel-plugin'
  ]
}