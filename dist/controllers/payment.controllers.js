"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

var paymentFunctions = {}; // Function that get payments

paymentFunctions.getPayments = function (req, res) {
  try {
    _connection["default"].any("SELECT * FROM payment").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los pagos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los pagos",
      error: error
    });
  }
}; // Function that get payments by worker


paymentFunctions.getPaymentsByWorker = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("SELECT pr.name_project, TO_CHAR( p.date_pay,'DD-MM-YYYY') as datepay, p.amount \n                 FROM payment p\n                 INNER JOIN projects pr on pr.id_project = p.id_project \n                 WHERE p.id_worker = $1", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los pagos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los pagos",
      error: error
    });
  }
}; // Function that insert payment


paymentFunctions.insertPayment = function (req, res) {
  try {
    var _req$body = req.body,
        idWorker = _req$body.idWorker,
        idProject = _req$body.idProject,
        amount = _req$body.amount;

    _connection["default"].none("INSERT INTO public.payment (id_worker, id_project, amount) VALUES ($1, $2, $3)", [idWorker, idProject, amount]).then(function () {
      return res.status(201).json({
        msg: "Pago creado exitosamente"
      });
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrio un error al registrar el pago",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrio un error al registrar el pago",
      err: err
    });
  }
};

var _default = paymentFunctions;
exports["default"] = _default;