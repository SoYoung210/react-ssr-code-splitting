module.exports = {
  "presets": [
    "@babel/typescript",
    "@babel/react",
    ["@babel/env", {
      "targets": {
        "node": "current"
      }
    }],
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    "react-hot-loader/babel",
    '@loadable/babel-plugin'
  ]
}
