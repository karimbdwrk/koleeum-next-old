"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetcher = fetcher;

function fetcher(url) {
  var options,
      response,
      data,
      _args = arguments;
  return regeneratorRuntime.async(function fetcher$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

          if (options) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url));

        case 4:
          response = _context.sent;
          _context.next = 10;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch(url, options));

        case 9:
          response = _context.sent;

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context.sent;
          console.log('fetcher :', data);
          return _context.abrupt("return", data);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}