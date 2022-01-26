"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connection = _interopRequireDefault(require("../database/connection"));

var interestFunctions = {};

interestFunctions.insertInterest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var name, area, percentage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            name = req.body.interestName;
            area = req.body.interestArea;
            percentage = req.body.interestPercentage;

            _connection["default"].none('INSERT INTO public.interest (name, area, percentage) VALUES ($1, $2, $3)', [name, area, percentage]).then(function () {
              return res.status(201).json({
                msg: "Interés creado exitosamente"
              });
            })["catch"](function (err) {
              console.log(err);
              return res.status(400).json({
                msg: "Ocurrio un error al agregar un interés",
                err: err
              });
            });

            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              msg: "Ocurrio un error al agregar un interés",
              err: _context.t0
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

interestFunctions.getInterests = function (req, res) {
  try {
    _connection["default"].any("SELECT id_interest, name, area, percentage FROM public.interest").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los intereses",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los intereses",
      error: error
    });
  }
};

interestFunctions.getInterestById = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("SELECT id_interest, name, area, percentage FROM public.interest WHERE id_interest = $1", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los intereses",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los intereses",
      error: error
    });
  }
};

interestFunctions.editInterest = function (req, res) {
  try {
    var name = req.body.interestName;
    var area = req.body.interestArea;
    var percentage = req.body.interestPercentage;
    var id = req.body.id;

    _connection["default"].none("UPDATE public.interest SET name = $1, area = $2, percentage = $3 WHERE id_interest = $4", [name, area, percentage, id]).then(function () {
      return res.status(200).json({
        msg: "Interés editado exitosamente"
      });
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al editar un interés",
        err: err
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Ocurrió un error al editar un interés",
      err: err
    });
  }
};

interestFunctions.deleteInterest = function (req, res) {
  req.body = JSON.parse(req.body.data);
  var id = req.body.id;

  try {
    _connection["default"].any("DELETE FROM public.interest WHERE id_interest = $1 ", [id]).then(function (data) {
      return res.status(200).json({
        msg: "Interés eliminado exitosamente"
      });
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Ocurrió un error al eliminar un interés",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Ocurrió un error al eliminar un interés",
      error: error
    });
  }
};

var _default = interestFunctions;
exports["default"] = _default;