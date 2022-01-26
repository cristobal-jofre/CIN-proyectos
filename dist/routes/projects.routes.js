"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _projects = _interopRequireDefault(require("../controllers/projects.controllers"));

var _FormValidator = _interopRequireDefault(require("../middleware/FormValidator"));

var _helpersFunctions = require("../helpers/helpersFunctions");

var router = (0, _express.Router)(); // GET

router.get('/projectsNameAndID', _projects["default"].getProjectsNameAndID);
router.get('/', _projects["default"].getProjects);
router.get('/:id/cashFlow', _projects["default"].getInterestByProjects);
router.get('/:id', _projects["default"].getProjectById);
router.get('/:id/workers', _projects["default"].getWorkersByProjects);
router.get('/:id/documents', _projects["default"].getDocumentsByProjects);
router.get('/:worker/projects', _projects["default"].getProjectsByWorker);
router.get('/:worker/projectsAndStatus', _projects["default"].getProjectAndStatussByWorker); // POST

router.post('/newProject', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormNewProject, _projects["default"].insertProject));
router.post('/projectStatus', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormStatusToProject, _projects["default"].insertProjectWithStatus));
router.post('/addWorkerToProject', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormWorkerToProject, _projects["default"].insertWorkersToProject));
router.post('/addInterestToProject', (0, _helpersFunctions.requestFormValidation)(_FormValidator["default"].validateFormInterestToProject, _projects["default"].insertInterestsToProject)); // DELETE

router["delete"]('/deleteProject/:id', _projects["default"].deleteProjectById);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;