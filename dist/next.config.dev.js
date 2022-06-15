"use strict";

module.exports = {
  reactStrictMode: true,
  presets: ['next/babel'],
  images: {
    domains: ['koleeum-aws-bucket.s3.eu-west-3.amazonaws.com']
  }
}; // module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/visite/:slug(\\d{1,})',
//         destination: '/:slug', // Matched parameters can be used in the destination
//         permanent: false,
//       },
//     ]
//   },
// }