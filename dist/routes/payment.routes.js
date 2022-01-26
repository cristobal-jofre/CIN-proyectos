"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _payment = _interopRequireDefault(require("../controllers/payment.controllers"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var _FormValidator = _interopRequireDefault(require("../middleware/FormValidator"));

var router = (0, _express.Router)(); // GET

router.get('/', _payment["default"].getPayments);
router.get('/:id/payments', _payment["default"].getPaymentsByWorker); // POST

router.post('/newPayment', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormPayment, _payment["default"].insertPayment));
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;