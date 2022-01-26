"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _interest = _interopRequireDefault(require("../controllers/interest.controllers"));

var _FormValidator = _interopRequireDefault(require("../middleware/FormValidator"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var router = (0, _express.Router)(); // GET

router.get('/', _interest["default"].getInterests);
router.get('/:id', _interest["default"].getInterestById); //PUT

router.put('/editInterest', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormEditInterest, _interest["default"].editInterest)); //POST

router.post('/newInterest', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormNewInterest, _interest["default"].insertInterest)); //DELETE

router["delete"]('/deleteInterest', _interest["default"].deleteInterest);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;