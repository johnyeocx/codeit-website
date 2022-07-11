const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }))

    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext]',
      },
    })
    return config;
  }
}

// module.exports = {
//   output: { path: path.resolve(__dirname, 'static'), },
// }
module.exports = nextConfig
