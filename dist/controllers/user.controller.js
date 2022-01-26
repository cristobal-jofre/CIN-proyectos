"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connection = _interopRequireDefault(require("../database/connection"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var userFunctions = {}; // Function that insert user

userFunctions.insertUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, rut, password, name, email, _yield$encryptPasswor, _yield$encryptPasswor2, passwordHash, salt;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, rut = _req$body.rut, password = _req$body.password, name = _req$body.name, email = _req$body.email;
            _context.next = 4;
            return (0, _helpersFunctions.encryptPassword)(password);

          case 4:
            _yield$encryptPasswor = _context.sent;
            _yield$encryptPasswor2 = (0, _slicedToArray2["default"])(_yield$encryptPasswor, 2);
            passwordHash = _yield$encryptPasswor2[0];
            salt = _yield$encryptPasswor2[1];

            _connection["default"].none("INSERT INTO public.user (rut, password_hash, salt, is_active, email, name) VALUES ($1, $2, $3, $4, $5, $6)", [rut, passwordHash, salt, true, email, name]).then(function () {
              return res.status(201).json({
                msg: "Usuario creado exitosamente"
              });
            })["catch"](function (err) {
              return res.status(400).json({
                msg: "Ocurrio un error al registrar un usuario",
                err: err
              });
            });

            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              msg: "Ocurrio un error al registrar un usuario",
              err: _context.t0
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Function that get users


userFunctions.getUsers = function (req, res) {
  try {
    _connection["default"].any("SELECT user_id, rut, name, is_active, email FROM public.user").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los usuarios",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los usuarios",
      error: error
    });
  }
}; // Function that change state


userFunctions.changeState = function (req, res) {
  try {
    req.body = JSON.parse(req.body.data);
    var _req$body2 = req.body,
        state = _req$body2.state,
        id = _req$body2.id;

    _connection["default"].none('UPDATE public.user SET is_active = not is_active WHERE user_id = $2', [state, id]).then(function () {
      return res.status(200).json({
        msg: 'Estado cambiado exitosamente'
      });
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los usuarios",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los usuarios",
      error: error
    });
  }
}; // Function that edit user


userFunctions.editUser = function (req, res) {
  try {
    var _req$body3 = req.body,
        rut = _req$body3.rut,
        name = _req$body3.name,
        email = _req$body3.email,
        id = _req$body3.id;

    _connection["default"].none("UPDATE public.user \n                SET name = $1, rut = $2, email = $3 \n                WHERE user_id = $4", [name, rut, email, id]).then(function () {
      return res.status(200).json({
        msg: "Usuario editado exitosamente"
      });
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrio un error al editar un usuario",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrio un error al editar un usuario",
      err: err
    });
  }
};

var _default = userFunctions;
exports["default"] = _default;