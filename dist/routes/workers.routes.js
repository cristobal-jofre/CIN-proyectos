"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _workers = _interopRequireDefault(require("../controllers/workers.controller"));

var _FormValidator = _interopRequireDefault(require("../middleware/FormValidator"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var router = (0, _express.Router)(); // GET

router.get('/', _workers["default"].getWorkers);
router.get('/:id', _workers["default"].getWorkerById); // PUT

router.put('/editWorker', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormWorker, _workers["default"].editWorker)); // POST

router.post('/newWorker', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormNewWorker, _workers["default"].insertWorker)); // DELETE

router["delete"]('/deleteWorker/:id', _workers["default"].deleteWorkerById);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;