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

var _token = _interopRequireDefault(require("../token.json"));

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

var createFolder = function createFolder(projectName) {
  return new Promise(function (resolve, reject) {
    var fileMetadata = {
      name: projectName,
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
        reject({
          status: false,
          error: err
        });
      }

      resolve({
        status: true,
        file: file.data.id
      });
    });
  });
};

exports.createFolder = createFolder;

var uploadFileFunction = function uploadFileFunction(idFolder, fileName, path, mimeType) {
  return new Promise(function (resolve, reject) {
    var auth = googleValidation();
    var fileMetadata = {
      name: fileName,
      parents: [idFolder]
    };
    var media = {
      mimeType: [mimeType],
      body: _fs["default"].createReadStream(path)
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
      if (err) {
        reject({
          status: false,
          error: err
        });
      }

      resolve({
        status: true,
        file: file.data.id
      });
    });
  });
};

exports.uploadFileFunction = uploadFileFunction;