const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   // https://github.com/vercel/next.js/issues/26527
  //   // disableStaticImages: true,
  // },

  reactStrictMode: true,
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // const assetRegex = new RegExp(`.(png|jpe?g|gif|woff|woff2|ico|svg)$`)

    // config.module.rules.push({
    //   test: assetRegex,
    //   type: 'asset/resource',
    //   generator: {
    //     filename: './static/assets/[name]-[contenthash].[ext]',
    //   },
    // })

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

const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
module.exports = nextConfig
