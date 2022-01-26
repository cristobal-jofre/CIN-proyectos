"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connection = _interopRequireDefault(require("../database/connection"));

var clientFunctions = {};

clientFunctions.insertClient = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var clientName, contact;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            clientName = req.body.clientName;
            contact = req.body.contact;

            _connection["default"].none('INSERT INTO public.company (contact, name) VALUES ($1, $2)', [contact, clientName]).then(function () {
              return res.status(201).json({
                msg: "Cliente creado exitosamente"
              });
            })["catch"](function (err) {
              return res.status(400).json({
                msg: "Ocurrió un error al agregar un cliente",
                err: err
              });
            });

            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              msg: "Ocurrió un error al agregar un cliente",
              err: _context.t0
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

clientFunctions.getClients = function (req, res) {
  try {
    _connection["default"].any("SELECT id_company, contact, name FROM public.company").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al obtener los clientes",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrió un error al obtener los clientes",
      err: err
    });
  }
};

clientFunctions.checkIfClientExists = function (req, res) {
  try {
    var clientName = req.params.name;

    _connection["default"].any("SELECT COUNT(*) FROM public.company WHERE name = $1", [clientName]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al chequear si el cliente existe",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrió un error al chequear si el cliente existe",
      err: err
    });
  }
};

var _default = clientFunctions;
exports["default"] = _default;