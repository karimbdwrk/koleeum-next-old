"use strict";

module.exports = {
  reactStrictMode: true,
  redirects: function redirects() {
    return regeneratorRuntime.async(function redirects$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", [{
              source: '/visite/:slug(\\d{1,})',
              destination: '/:slug',
              // Matched parameters can be used in the destination
              permanent: false
            }]);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
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