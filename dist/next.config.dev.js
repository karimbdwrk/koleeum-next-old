"use strict";

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['koleeum-aws-bucket.s3.eu-west-3.amazonaws.com']
  },
  redirects: function redirects() {
    return regeneratorRuntime.async(function redirects$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", [{
              source: '*/visite/investisseurs',
              destination: '/investisseurs',
              permanent: true
            }, {
              source: '*/visite/espace-client',
              destination: '/espace-client',
              permanent: true
            }]);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};