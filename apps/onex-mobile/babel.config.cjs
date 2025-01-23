/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      'relay',
      'react-native-reanimated/plugin' // reanimated has to be listed last
    ]
  };
}