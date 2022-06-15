"use strict";

module.exports = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['koleeum-aws-bucket.s3.eu-west-3.amazonaws.com']
  }
};