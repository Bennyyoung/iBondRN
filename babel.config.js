module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.ts',
            '.tsx',
            '.json',
            '.svg',
          ],
          alias: {
            '@/utils': './src/utils',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/reduxFolder': './src/reduxFolder',
            '@/assets': './src/assets',
            '@/navigation': './src/navigation',
            '@/constants': './src/constants',
            '@/features': './src/features',
          },
        },
      ],
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-export-namespace-from',
    ],
  };
};
