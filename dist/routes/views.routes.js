"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)(); // Get render of views

router.get('/', function (req, res) {
  res.render('login');
});
router.get('/home', function (req, res) {
  res.render('home');
});
router.get('/users', function (req, res) {
  res.render('adminUsers');
});
router.get('/projects', function (req, res) {
  res.render('projects');
});
router.get('/addProject', function (req, res) {
  res.render('addProject');
});
router.get('/workers', function (req, res) {
  res.render('workers');
});
router.get('/workersPay', function (req, res) {
  res.render('workersPay');
});
router.get('/addDocu', function (req, res) {
  res.render('addDocu');
});
router.get('/interests', function (req, res) {
  res.render('interests');
});
router.get('/addNewInterest', function (req, res) {
  res.render('addNewInterest');
});
router.get('/detailsProject/:id', function (req, res) {
  res.render('detailsProject', {
    id: req.params.id
  });
});
router.get('/cashFlowProject/:id', function (req, res) {
  res.render('cashFlowProject', {
    id: req.params.id
  });
});
router.get('/detailsWorker/:id', function (req, res) {
  res.render('detailsWorker', {
    id: req.params.id
  });
});
var _default = router;
exports["default"] = _default;