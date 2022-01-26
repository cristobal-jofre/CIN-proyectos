"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _status = _interopRequireDefault(require("../controllers/status.controllers"));

var _FormValidator = _interopRequireDefault(require("../middleware/FormValidator"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var router = (0, _express.Router)(); // GET

router.get('/', _status["default"].getStatusProjects); // POST

router.post('/changeStatus', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateChangeStateProject, _status["default"].changeStatus));
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;