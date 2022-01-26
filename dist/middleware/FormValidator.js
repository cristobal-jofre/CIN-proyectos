"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.validateFormInterestToProject = exports.validateFormWorkerToProject = exports.validateFormStatusToProject = exports.validateFormNewProject = exports.validateFormNewClient = exports.validateFormEditInterest = exports.validateFormNewInterest = exports.validateFormPayment = exports.validateChangeStateProject = exports.validateFormLogin = exports.validateFormNewWorker = exports.validateFormWorker = exports.validateFormUser = void 0;

var _isEmpty = _interopRequireDefault(require("is-empty"));

var validationFunctions = {}; // Function that validates the inputs from user

var validateFormUser = validationFunctions.validateFormUser = function (payload, method) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.name)) {
      isValid = false;
      errors.name = true;
    }

    if ((0, _isEmpty["default"])(payload.rut)) {
      isValid = false;
      errors.rut = true;
    }

    if ((0, _isEmpty["default"])(payload.email)) {
      isValid = false;
      errors.email = true;
    }

    if (method === 'POST') {
      if ((0, _isEmpty["default"])(payload.password)) {
        isValid = false;
        errors.passwd = true;
      }
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormUser = validateFormUser;

var validateFormWorker = validationFunctions.validateFormWorker = function (payload, method) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.name)) {
      isValid = false;
      errors.name = true;
    }

    if ((0, _isEmpty["default"])(payload.rut)) {
      isValid = false;
      errors.rut = true;
    }

    if ((0, _isEmpty["default"])(payload.email)) {
      isValid = false;
      errors.email = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormWorker = validateFormWorker;

var validateFormNewWorker = validationFunctions.validateFormNewWorker = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.name)) {
      isValid = false;
      errors.name = true;
    }

    if ((0, _isEmpty["default"])(payload.rut)) {
      isValid = false;
      errors.rut = true;
    }

    if ((0, _isEmpty["default"])(payload.email)) {
      isValid = false;
      errors.email = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormNewWorker = validateFormNewWorker;

var validateFormLogin = validationFunctions.validateFormLogin = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.'; // TODO: validar rut

  if (payload) {
    if ((0, _isEmpty["default"])(payload.rut)) {
      isValid = false;
      errors.rut = true;
    }

    if ((0, _isEmpty["default"])(payload.passwd)) {
      isValid = false;
      errors.passwd = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
}; // Function that validates the inputs from change state of project


exports.validateFormLogin = validateFormLogin;

var validateChangeStateProject = validationFunctions.validateChangeStateProject = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if (payload.state == '0') {
      isValid = false;
      errors.state = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
}; // Function that validates the inputs from payments


exports.validateChangeStateProject = validateChangeStateProject;

var validateFormPayment = validationFunctions.validateFormPayment = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if (payload.idWorker == 0) {
      isValid = false;
      errors.workers = true;
    }

    if (payload.idProject == 0) {
      isValid = false;
      errors.projects = true;
    }

    if ((0, _isEmpty["default"])(payload.amount)) {
      isValid = false;
      errors.amount = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormPayment = validateFormPayment;

var validateFormNewInterest = validationFunctions.validateFormNewInterest = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.interestName)) {
      isValid = false;
      errors.interestName = true;
    }

    if ((0, _isEmpty["default"])(payload.interestArea)) {
      isValid = false;
      errors.interestArea = true;
    }

    if ((0, _isEmpty["default"])(payload.interestPercentage)) {
      isValid = false;
      errors.interestPercentage = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormNewInterest = validateFormNewInterest;

var validateFormEditInterest = validationFunctions.validateFormEditInterest = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.interestName)) {
      isValid = false;
      errors.interestName = true;
    }

    if ((0, _isEmpty["default"])(payload.interestArea)) {
      isValid = false;
      errors.interestArea = true;
    }

    if ((0, _isEmpty["default"])(payload.interestPercentage)) {
      isValid = false;
      errors.interestPercentage = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormEditInterest = validateFormEditInterest;

var validateFormNewClient = validationFunctions.validateFormNewClient = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.clientName)) {
      isValid = false;
      errors.clientName = true;
    }

    if ((0, _isEmpty["default"])(payload.contact)) {
      isValid = false;
      errors.contact = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormNewClient = validateFormNewClient;

var validateFormNewProject = validationFunctions.validateFormNewProject = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.projectName)) {
      isValid = false;
      errors.projectName = true;
    }

    if ((0, _isEmpty["default"])(payload.external)) {
      isValid = false;
      errors.external = true;
    }

    if ((0, _isEmpty["default"])(payload.initialBalance)) {
      isValid = false;
      errors.initialBalance = true;
    }

    if ((0, _isEmpty["default"])(payload.deadlineDate)) {
      isValid = false;
      errors.deadlineDate = true;
    }

    if ((0, _isEmpty["default"])(payload.budget)) {
      isValid = false;
      errors.budget = true;
    }

    if ((0, _isEmpty["default"])(payload.idClient)) {
      isValid = false;
      errors.idClient = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormNewProject = validateFormNewProject;

var validateFormStatusToProject = validationFunctions.validateFormStatusToProject = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.projectID)) {
      isValid = false;
      errors.projectID = true;
    }

    if ((0, _isEmpty["default"])(payload.projectDate)) {
      isValid = false;
      errors.projectDate = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormStatusToProject = validateFormStatusToProject;

var validateFormWorkerToProject = validationFunctions.validateFormWorkerToProject = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.projectID)) {
      isValid = false;
      errors.projectID = true;
    }

    if ((0, _isEmpty["default"])(payload.workerID)) {
      isValid = false;
      errors.workerID = true;
    }

    if ((0, _isEmpty["default"])(payload.startDate)) {
      isValid = false;
      errors.startDate = true;
    }

    if ((0, _isEmpty["default"])(payload.endDate)) {
      isValid = false;
      errors.endDate = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormWorkerToProject = validateFormWorkerToProject;

var validateFormInterestToProject = validationFunctions.validateFormInterestToProject = function (payload) {
  var errors = {};
  var isValid = true;
  var msg = 'Corrija los errores del formulario.';

  if (payload) {
    if ((0, _isEmpty["default"])(payload.projectID)) {
      isValid = false;
      errors.projectID = true;
    }

    if ((0, _isEmpty["default"])(payload.interestID)) {
      isValid = false;
      errors.interestID = true;
    }
  } else {
    msg = "Error al recibir los datos del formulario";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors,
    msg: msg
  };
};

exports.validateFormInterestToProject = validateFormInterestToProject;
var _default = validationFunctions;
exports["default"] = _default;