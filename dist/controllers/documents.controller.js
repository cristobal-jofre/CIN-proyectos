"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _connection = _interopRequireDefault(require("../database/connection"));

var _DriveApi = require("../middleware/DriveApi");

var _config = require("../config.json");

var documentsFunctions = {};

var generateFile = function generateFile(name, file) {
  var route = _config.staticFolderPath + '/' + name;

  _fs["default"].writeFile(route, file, function (err) {
    if (err) {
      throw new Error('Error al procesar el archivo');
    }
  });

  return route;
};

var updateDocumentDb = function updateDocumentDb(idFile, idProject) {
  return new Promise(function (resolve, reject) {
    _connection["default"].none('INSERT INTO documents (dirdoc, id_project, datedoc) VALUES ($1, $2, NOW())', [idFile, idProject]).then(function () {
      resolve();
    })["catch"](function (err) {
      console.log(err);
      reject(err);
    });
  });
};

documentsFunctions.uploadDocument = function (req, res) {
  try {
    var data = JSON.parse(req.body.data);
    var idProject = data.idProject,
        nameProject = data.nameProject;
    var files = req.files.files;

    _connection["default"].one('SELECT idfolder FROM projects WHERE id_project = $1', idProject).then(function (value) {
      var idfolder = value.idfolder;

      if (idfolder == null) {
        (0, _DriveApi.createFolder)(nameProject).then(function (folder) {
          _connection["default"].none('UPDATE projects SET idfolder = $1 WHERE id_project = $2', [folder.file, idProject]).then(function () {
            var path = generateFile(files.name, files.data);
            (0, _DriveApi.uploadFileFunction)(folder.file, files.name, path, files.mimetype).then(function (response) {
              updateDocumentDb(response.file, idProject).then(function () {
                _fs["default"].unlinkSync(path);

                return res.status(201).json({
                  msg: "Documento subido exitosamente"
                });
              })["catch"](function (err) {
                return res.status(400).json({
                  msg: "Ocurrió un error al subir el documento en la base de datos",
                  error: err
                });
              });
            })["catch"](function (err) {
              return res.status(400).json({
                msg: "Ocurrió un error al subir el archivo",
                error: err
              });
            });
          })["catch"](function (err) {
            return res.status(400).json({
              msg: "Ocurrió un error al actualizar la carpeta del proyecto",
              error: err
            });
          });
        })["catch"](function (err) {
          return res.status(400).json({
            msg: "Ocurrió un error al crear la carpeta",
            error: err
          });
        });
      } else {
        var path = generateFile(files.name, files.data);
        (0, _DriveApi.uploadFileFunction)(idfolder, files.name, path, files.mimetype).then(function (response) {
          updateDocumentDb(response.file, idProject).then(function () {
            _fs["default"].unlinkSync(path);

            return res.status(201).json({
              msg: "Documento subido exitosamente"
            });
          })["catch"](function (err) {
            return res.status(400).json({
              msg: "Ocurrió un error al subir el documento en la base de datos",
              error: err
            });
          });
        })["catch"](function (err) {
          return res.status(400).json({
            msg: "Ocurrió un error al subir el archivo",
            error: err
          });
        });
      }
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al obtener los datos del proyecto",
        error: err
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Ocurrió un error al subir documento",
      error: error
    });
  }
};

var _default = documentsFunctions;
exports["default"] = _default;