const reactWebpackConfig = require('@nrwl/react/plugins/webpack');
// const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { ModuleFederationPlugin } = require('webpack').container;
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function addEsBuildAndRemoveBabel(config) {
  config.module.rules.splice(1, 1, {
    test: /\.tsx?$/,
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015',
    },
  });
}

function getWebpackConfig(config) {
  config = reactWebpackConfig(config);
  // console.log('config', config);
  // config.output.publicPath = 'http://localhost:3001';
  config.module.rules.splice(1, 1, {
    test: /\.tsx?$/,
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015',
    },
  });

  // addEsBuildAndRemoveBabel(config);

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'home',
      library: { type: 'var', name: 'home' },
      filename: 'remoteEntry.js',
      remotes: {
        nav: 'nav@htttp://localhost:3002/remoteEntry.js',
      },
      exposes: {
        './Nav': './src/app/app.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    })
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportFilename: 'bundles-report/index.html',
    // })
  );
  config.optimization = {
    ...config.optimization,
    runtimeChunk: false,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
    splitChunks: {
      chunks(chunk) {
        return false;
      },
    },
  };

  // https://github.com/facebook/create-react-app/blob/bb64e31a81eb12d688c14713dce812143688750a/packages/react-scripts/config/webpack.config.js#L705
  // config.plugins.push(
  //   new WebpackManifestPlugin({
  //     fileName: 'manifest.json',
  //     publicPath: '/',
  //     generate: (seed, files, entrypoints) => {
  //       const manifestFiles = files.reduce((manifest, file) => {
  //         manifest[file.name] = file.path;
  //         return manifest;
  //       }, seed);
  //       const entrypointFiles = entrypoints.main.filter(
  //         (fileName) => !fileName.endsWith('.map')
  //       );
  //
  //       return {
  //         files: manifestFiles,
  //         entrypoints: entrypointFiles,
  //       };
  //     },
  //   })
  // );

  return config;
}

module.exports = getWebpackConfig;
