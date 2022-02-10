const reactWebpackConfig = require('@nrwl/react/plugins/webpack');
// const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { ModuleFederationPlugin } = require('webpack').container;
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function getWebpackConfig(config) {
  config = reactWebpackConfig(config);
  // config.devServer.port = 8000;
  // console.log('config', config);
  // config.output.publicPath = 'http://localhost:3002';
  config.module.rules.splice(1, 1, {
    test: /\.tsx?$/,
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015',
    },
  });

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'nav',
      library: { type: 'var', name: 'nav' },
      filename: 'remoteEntry.js',
      remotes: {
        // nav: 'nav',
        aris: 'nav@http://localhost:3002/remoteEntry.js',
      },
      exposes: {
        './App': './src/app/app.tsx',
        './Header': './src/app/header.tsx',
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
