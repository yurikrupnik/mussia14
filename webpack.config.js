const reactWebpackConfig = require('@nrwl/react/plugins/webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

function getWebpackConfig(config, a) {
  console.log('a', a);
  console.log('config', a);
  config = reactWebpackConfig(config);
  // config.module.rules.splice(1, 1, {
  //   // todo test
  //   // remove second item = babel
  //   test: /\.tsx?$/,
  //   loader: 'esbuild-loader',
  //   options: {
  //     loader: 'tsx',
  //     target: 'es2015',
  //   },
  // });
  config.optimization = {
    ...config.optimization,
    runtimeChunk: false,
    minimizer: [
      // new ESBuildMinifyPlugin({
      //   // todo test
      //   target: 'es2015',
      // }),
    ],
    splitChunks: {
      chunks(chunk) {
        return false;
      },
    },
  };

  // https://github.com/facebook/create-react-app/blob/bb64e31a81eb12d688c14713dce812143688750a/packages/react-scripts/config/webpack.config.js#L705
  config.plugins.push(
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          (fileName) => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    })
  );

  return config;
}

module.exports = getWebpackConfig;
