"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

var statusFunctions = {}; // Function that get status from projects

statusFunctions.getStatusProjects = function (req, res) {
  try {
    _connection["default"].any("SELECT * FROM status s").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los estados de un proyecto",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los estados de un proyecto",
      error: error
    });
  }
}; // Function that change status


statusFunctions.changeStatus = function (req, res) {
  try {
    var _req$body = req.body,
        state = _req$body.state,
        idProject = _req$body.idProject;

    _connection["default"].any("INSERT INTO statusproject (id_status,id_project) VALUES ($1,$2) RETURNING *", [state, idProject]).then(function (data) {
      return res.status(201).json({
        msg: "Estado cambiado existosamente"
      });
    })["catch"](function (error) {
      console.log(error);
      return res.status(400).json({
        msg: "Error al cambiar el estado de un proyecto",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al cambiar el estado de un proyecto",
      error: error
    });
  }
};

var _default = statusFunctions;
exports["default"] = _default;