"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileFunction = exports.createFolder = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _googleapis = require("googleapis");

var _gdriveUtils = _interopRequireDefault(require("gdrive-utils"));

var _credentials = _interopRequireDefault(require("../../credentials.json"));

var _token = _interopRequireDefault(require("../../token.json"));

var gdriveUtil = new _gdriveUtils["default"](_credentials["default"], _token["default"]);

var googleValidation = function googleValidation() {
  var _credentials$installe = _credentials["default"].installed,
      client_secret = _credentials$installe.client_secret,
      client_id = _credentials$installe.client_id,
      redirect_uris = _credentials$installe.redirect_uris;
  var oAuth2Client = new _googleapis.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(gdriveUtil.oauth2Client.credentials);
  return oAuth2Client;
};

var createFolder = function createFolder(req, res) {
  try {
    req.body = JSON.parse(req.body.data);
    var fileMetadata = {
      name: req.body.nameProject,
      mimeType: "application/vnd.google-apps.folder"
    };
    var auth = googleValidation();

    var drive = _googleapis.google.drive({
      version: "v3",
      auth: auth
    });

    drive.files.create({
      resource: fileMetadata,
      fields: "id"
    }, function (err, file) {
      if (err) {
        return res.status(400).json({
          msg: "Ocurrio un error al crear la carpeta",
          err: err
        });
      }

      console.log(file);
      return res.status(200).json({
        message: "Exito",
        file: file.data.id
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Ocurrio un error en el servidor",
      error: error
    });
  }
};

exports.createFolder = createFolder;

var uploadFileFunction = function uploadFileFunction(req, res) {
  try {
    req.body = JSON.parse(req.body.data);
    var folder = req.body.folder;
    var auth = googleValidation();
    var fileMetadata = {
      name: req.body.name,
      parents: [idCarpeta]
    };
    var media = {
      mimeType: ["image/png", "image/jpeg", "image/jpg"],
      body: _fs["default"].createReadStream("".concat(staticFolderPath, "/").concat(req.body.path))
    };

    var drive = _googleapis.google.drive({
      version: "v3",
      auth: auth
    });

    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id"
    }, function (err, file) {
      if (!err) res.status(200).json({
        message: "Exito",
        file: file.data.id
      });else res.status(400).json({
        message: "Error",
        error: err
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Ocurrio un error en el servidor",
      error: error
    });
  }
};

exports.uploadFileFunction = uploadFileFunction;