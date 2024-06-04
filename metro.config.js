const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);

  const { transformer, resolver } = defaultConfig;

  defaultConfig.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  defaultConfig.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'cjs'],
  };

  return defaultConfig;
})();