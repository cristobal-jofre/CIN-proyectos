"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

var workerFunctions = {}; // Function that insert worker

workerFunctions.insertWorker = function (req, res) {
  try {
    var _req$body = req.body,
        rut = _req$body.rut,
        name = _req$body.name,
        email = _req$body.email;

    _connection["default"].none("INSERT INTO public.workers(rut,name,email) VALUES ($1,$2,$3)", [rut, name, email]).then(function () {
      return res.status(201).json({
        msg: "Trabajador creado exitosamente"
      });
    })["catch"](function (err) {
      console.log(err);
      return res.status(400).json({
        msg: "Ocurrio un error al registrar un trabajador",
        err: err
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Ocurrio un error al registrar un trabajador",
      err: err
    });
  }

  ;
}; // Function that get workers


workerFunctions.getWorkers = function (req, res) {
  try {
    _connection["default"].any("SELECT id_worker,rut,name,email FROM public.workers").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los trabajadores",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los trabajadores",
      error: error
    });
  }
}; // Function that get worker by id


workerFunctions.getWorkerById = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("SELECT rut,name,email FROM public.workers WHERE id_worker = $1", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los trabajadores",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los trabajadores",
      error: error
    });
  }
};

workerFunctions.editWorker = function (req, res) {
  try {
    var _req$body2 = req.body,
        rut = _req$body2.rut,
        name = _req$body2.name,
        email = _req$body2.email,
        id = _req$body2.id;

    _connection["default"].none("UPDATE public.workers \n                SET name = $1, rut = $2, email = $3 \n                WHERE id_worker = $4", [name, rut, email, id]).then(function () {
      return res.status(200).json({
        msg: "Trabajador editado exitosamente"
      });
    })["catch"](function (err) {
      console.log(err);
      return res.status(400).json({
        msg: "Ocurrió un error al editar un trabajador",
        err: err
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Ocurrió un error al editar un trabajador",
      err: err
    });
  }
};

workerFunctions.deleteWorkerById = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("DELETE FROM public.workers WHERE id_worker = $1 ", [id]) // TODO: Eliminar la referencia a workers
    .then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      console.log(error);
      return res.status(400).json({
        msg: "Error al obtener los trabajadores",
        error: error
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al obtener los trabajadores",
      error: error
    });
  }
};

var _default = workerFunctions;
exports["default"] = _default;