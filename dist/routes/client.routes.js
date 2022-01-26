"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _client = _interopRequireDefault(require("../controllers/client.controllers"));

var _FormValidator = _interopRequireDefault(require("../middleware/FormValidator"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var router = (0, _express.Router)(); // GET

router.get('/clients', _client["default"].getClients);
router.get('/:name/checkIfClientExists', _client["default"].checkIfClientExists); // POST

router.post('/newClient', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormNewClient, _client["default"].insertClient));
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;