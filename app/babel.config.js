module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './components',
            '@screens': './screens',
            '@assets': './assets',
            '@navigations': './navigations',
            '@utils': './utils',
            '@providers': './providers',
            '@features': './features',
            '@hooks': './hooks',
          },
        },
      ],
    ],
  };
};
