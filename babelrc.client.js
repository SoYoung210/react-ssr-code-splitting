module.exports = {
  "presets": [
    ["@babel/env", {
      "targets": {
        "node": 6
      }
    }],
    "@babel/typescript",
    "@babel/react"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    "react-hot-loader/babel"
  ]
}
