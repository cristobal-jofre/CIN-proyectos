"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _FormValidator = _interopRequireDefault(require("../middleware/FormValidator"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var router = (0, _express.Router)(); // GET

router.get('/users', _user["default"].getUsers); // PUT

router.put('/editUser', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormUser, _user["default"].editUser)); // POST

router.post('/newUser', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormUser, _user["default"].insertUser));
router.post('/changeState', _user["default"].changeState);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;