module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      [
        "module-resolver",
        {
          "root": ["./src"],
          "alias": {
            "@components": "./src/app/components",
            "@screens": "./src/app/screens",
            "@config": "./src/config",
            "@constants": "./src/constants",
            "@redux": "./src/redux",
            "@services": "./src/services",
            "@utils": "./src/utils",
            "@propTypes": "./src/propTypes",
            "@assets": './src/app/assets'
          }
        }
      ]
    ]
  };
};
