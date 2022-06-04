"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIdFromServerCookie = exports.getTokenFromServerCookie = exports.getTokenFromLocalCookie = exports.getIdFromLocalCookie = exports.getUserFromLocalCookie = exports.unsetToken = exports.setToken = void 0;

var _router = _interopRequireDefault(require("next/router"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setToken = function setToken(data) {
  if (typeof window === 'undefined') {
    return;
  }

  _jsCookie["default"].set('id', data.user.id);

  _jsCookie["default"].set('username', data.user.username);

  _jsCookie["default"].set('jwt', data.jwt);

  if (_jsCookie["default"].get('username')) {
    _router["default"].reload('/');
  }
};

exports.setToken = setToken;

var unsetToken = function unsetToken() {
  if (typeof window === 'undefined') {
    return;
  }

  _jsCookie["default"].remove('id');

  _jsCookie["default"].remove('jwt');

  _jsCookie["default"].remove('username');

  _router["default"].reload('/');
};

exports.unsetToken = unsetToken;

var getUserFromLocalCookie = function getUserFromLocalCookie() {
  var jwt = getTokenFromLocalCookie();

  if (jwt) {
    return (0, _api.fetcher)("https://koleeum-admin.herokuapp.com/users/me", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(jwt)
      }
    }).then(function (data) {
      return data.username;
    })["catch"](function (error) {
      return console.error(error);
    });
  } else {
    return;
  }
};

exports.getUserFromLocalCookie = getUserFromLocalCookie;

var getIdFromLocalCookie = function getIdFromLocalCookie() {
  var jwt = getTokenFromLocalCookie();

  if (jwt) {
    return (0, _api.fetcher)("https://koleeum-admin.herokuapp.com/users/me", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(jwt)
      }
    }).then(function (data) {
      return data.id;
    });
  } else {
    return;
  }
};

exports.getIdFromLocalCookie = getIdFromLocalCookie;

var getTokenFromLocalCookie = function getTokenFromLocalCookie() {
  return _jsCookie["default"].get('jwt');
};

exports.getTokenFromLocalCookie = getTokenFromLocalCookie;

var getTokenFromServerCookie = function getTokenFromServerCookie(req) {
  if (!req.headers.cookie || '') {
    return undefined;
  }

  var jwtCookie = req.headers.cookie.split(';').find(function (c) {
    return c.trim().startsWith('jwt=');
  });

  if (!jwtCookie) {
    return undefined;
  }

  var jwt = jwtCookie.split('=')[1];
  return jwt;
};

exports.getTokenFromServerCookie = getTokenFromServerCookie;

var getIdFromServerCookie = function getIdFromServerCookie(req) {
  if (!req.headers.cookie || '') {
    return undefined;
  }

  var idCookie = req.headers.cookie.split(';').find(function (c) {
    return c.trim().startsWith('id=');
  });

  if (!idCookie) {
    return undefined;
  }

  var id = idCookie.split('=')[1];
  return id;
};

exports.getIdFromServerCookie = getIdFromServerCookie;