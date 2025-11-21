const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@app": "./app",
  "@components": "./components",
  "@contexts": "./contexts",
  "@lib": "./lib",
  "@hooks": "./hooks",
  "@appTypes": "./app-data-types",
  "@locales": "./locales",
  "@services": "./services",
  "@appUtils": "./app-utils",
};

// Required for Metro 0.81+ (Expo SDK 54)
config.transformer.unstable_allowRequireContext = true;

module.exports = withNativeWind(config, {
  input: "./global.css",
});
