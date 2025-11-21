// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Required for Metro 0.81+ (Expo SDK 54)
config.transformer.unstable_allowRequireContext = true;

module.exports = withNativeWind(config, {
  input: "./global.css",
});
