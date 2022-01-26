"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connection = _interopRequireDefault(require("../database/connection"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var authFunctions = {}; // Function that login user into system

authFunctions.login = function (req, res) {
  try {
    var _req$body = req.body,
        rut = _req$body.rut,
        passwd = _req$body.passwd;

    _connection["default"].oneOrNone("SELECT * FROM public.user WHERE rut = $1", rut).then( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
        var isActive, passwordHash, _rut, match, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 18;
                  break;
                }

                isActive = user.isActive, passwordHash = user.passwordHash, _rut = user.rut;

                if (!isActive) {
                  _context.next = 15;
                  break;
                }

                _context.next = 5;
                return (0, _helpersFunctions.matchPassword)(passwd, passwordHash);

              case 5:
                match = _context.sent;

                if (!match) {
                  _context.next = 12;
                  break;
                }

                token = (0, _helpersFunctions.generateToken)(_rut);
                res.cookie('auth', token);
                return _context.abrupt("return", res.status(200).json({
                  token: token,
                  msg: 'Sesión iniciada exitosamente'
                }));

              case 12:
                return _context.abrupt("return", res.status(400).json({
                  msg: "Contraseña incorrecta"
                }));

              case 13:
                _context.next = 16;
                break;

              case 15:
                return _context.abrupt("return", res.status(400).json({
                  msg: "Usuario se encuentra bloqueado"
                }));

              case 16:
                _context.next = 19;
                break;

              case 18:
                return _context.abrupt("return", res.status(400).json({
                  msg: "Usuario incorrecto"
                }));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }())["catch"](function (err) {
      return res.status(400).json({
        msg: "Error al iniciar sesión",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Error al iniciar sesión",
      err: err
    });
  }
};

var _default = authFunctions;
exports["default"] = _default;