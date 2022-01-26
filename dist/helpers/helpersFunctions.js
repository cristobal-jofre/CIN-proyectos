"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestFormValidation = exports.isAutenticated = exports.generateToken = exports.matchPassword = exports.encryptPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _connection = _interopRequireDefault(require("../database/connection"));

var _config = require("../config.json");

// Function that encrypt password
var encryptPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var salt, passwordHash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            passwordHash = _context.sent;
            return _context.abrupt("return", [passwordHash, salt]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function encryptPassword(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Function that match password


exports.encryptPassword = encryptPassword;

var matchPassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password, password_hash) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(password, password_hash);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function matchPassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); // Function that generate token


exports.matchPassword = matchPassword;

var generateToken = function generateToken(rut) {
  return _jsonwebtoken["default"].sign({
    rut: rut
  }, _config.secretToken, {
    expiresIn: '2h'
  });
}; // Function that verify if user is autenticated


exports.generateToken = generateToken;

var isAutenticated = function isAutenticated(req, res, next) {
  var token = req.cookies.auth || undefined;

  if (!token) {
    return res.status(403).json({
      msg: 'Acceso denegado'
    });
  }

  _jsonwebtoken["default"].verify(token, _config.secretToken, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        msg: 'La sesión expiró, vuelva a iniciar sesión para continuar.'
      });
    }

    var rut = decoded.rut;

    _connection["default"].one("SELECT * \n                  FROM public.user\n                  WHERE rut = $1", rut).then(function (user) {
      req.user = user;
      next();
    })["catch"](function (error) {
      res.status(500).json({
        msg: 'Su sesión ha expirado',
        error: error
      });
    });
  });
}; // Function that execute a form validator


exports.isAutenticated = isAutenticated;

var requestFormValidation = function requestFormValidation(preValidation, callback) {
  return function (req, res, next) {
    if (req.body && req.body.data) req.body = JSON.parse(req.body.data);
    var formValidation = preValidation(req.body, req.method);
    if (formValidation.isValid) return callback(req, res, next);
    res.status(400).json(formValidation);
  };
};

exports.requestFormValidation = requestFormValidation;