"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

var projectFunctions = {}; // Function that insert project

projectFunctions.insertProject = function (req, res) {
  try {
    var name = req.body.projectName;
    var external = req.body.external;
    var balance = req.body.initialBalance;
    var deliveryDate = req.body.deadlineDate;
    var estimate = req.body.budget;
    var clientID = req.body.idClient;

    _connection["default"].none("INSERT INTO public.projects(name_project,externos_n,balance,deliveryDate,estimate,id_company) VALUES ($1,$2,$3,$4,$5,$6)", [name, external, balance, deliveryDate, estimate, clientID]).then(function () {
      return res.status(201).json({
        msg: "Proyecto creado exitosamente"
      });
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al registrar un proyecto",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrió un error al registrar un proyecto",
      err: err
    });
  }
};

projectFunctions.insertProjectWithStatus = function (req, res) {
  try {
    var projectID = req.body.projectID;
    var projectDate = req.body.projectDate;
    var statusID = 1;

    _connection["default"].none('INSERT INTO public.statusproject (id_status,id_project,date_project) VALUES ($1,$2,$3)', [statusID, projectID, projectDate]).then(function () {
      return res.status(201).json({
        msg: "Proyecto registrado exitosamente"
      });
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al registrar un proyecto",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrió un error al registrar un proyecto",
      err: err
    });
  }
};

projectFunctions.insertWorkersToProject = function (req, res) {
  try {
    var projectID = req.body.projectID;
    var workerID = req.body.workerID;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    _connection["default"].none('INSERT INTO public.workerproject (id_worker,id_project,start_date,date_end) VALUES ($1,$2,$3,$4)', [workerID, projectID, startDate, endDate]).then(function () {
      return res.status(201).json({
        msg: "Trabajador ha sido agregado al proyecto exitosamente"
      });
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al agregar un trabajador al proyecto",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrió un error al agregar un trabajador al proyecto",
      err: err
    });
  }
};

projectFunctions.insertInterestsToProject = function (req, res) {
  try {
    var projectID = req.body.projectID;
    var interestID = req.body.interestID;

    _connection["default"].none('INSERT INTO public.projectinterest (id_project,id_interest) VALUES ($1,$2)', [projectID, interestID]).then(function () {
      return res.status(201).json({
        msg: "Interés ha sido agregado al proyecto exitosamente"
      });
    })["catch"](function (err) {
      return res.status(400).json({
        msg: "Ocurrió un error al agregar un interés al proyecto",
        err: err
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocurrió un error al agregar un interés al proyecto",
      err: err
    });
  }
};

projectFunctions.getProjectsNameAndID = function (req, res) {
  try {
    _connection["default"].any("SELECT id_project, name_project FROM public.projects").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los proyectos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los proyectos",
      error: error
    });
  }
}; // Function that get all projects


projectFunctions.getProjects = function (req, res) {
  try {
    _connection["default"].any("SELECT  p.id_project,name_project,  balance , TO_CHAR( deliverydate,'DD-MM-YYYY') AS deliveryDate,  estimate , s3.name_status  AS status \n                  FROM projects p\n                  INNER JOIN statusproject s ON p.id_project = s.id_project\n                  INNER JOIN status s3 ON s3.id_status = s.id_status\n                  WHERE date_project = (select MAX(s2.date_project) FROM statusproject s2 WHERE s2.id_project = p.id_project )").then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los proyectos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los proyectos",
      error: error
    });
  }
};

projectFunctions.getInterestByProjects = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("SELECT p2.estimate \n                 FROM projectinterest p\n                 INNER JOIN projects p2 ON p.id_project = p2.id_project \n                 WHERE p2.id_project = $1\n                 GROUP BY p2.estimate", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los proyectos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los proyectos",
      error: error
    });
  }
}; // Function that get projects by id


projectFunctions.getProjectById = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("SELECT name_project,balance,TO_CHAR( deliverydate,'DD-MM-YYYY') as deliveryDate,estimate,status \n                  FROM public.projects \n                  WHERE id_project = $1", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los proyectos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los proyectos",
      error: error
    });
  }
}; // Function that get workers by project


projectFunctions.getWorkersByProjects = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("SELECT w2.rut ,w2.name,w2.email \n                  FROM workerproject w \n                  INNER JOIN workers w2 ON w.id_worker = w2.id_worker \n                  WHERE w.id_project = $1", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los trabajadores de un proyecto",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los trabajadores de un proyecto",
      error: error
    });
  }
}; // Function that get documents by projects


projectFunctions.getDocumentsByProjects = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("SELECT d.dirdoc, TO_CHAR( d.datedoc,'DD-MM-YYYY') as datedoc\n                  FROM documents d \n                  INNER JOIN projects p ON p.id_project = d.id_project \n                  WHERE d.id_project = $1", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los documentos de un proyecto",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los documentos de un proyecto",
      error: error
    });
  }
}; // Function that delete projects by id


projectFunctions.deleteProjectById = function (req, res) {
  var id = req.params.id;

  try {
    _connection["default"].any("DELETE FROM public.projects WHERE id_project = $1 ", [id]) // TODO: Eliminar la referencia a workers
    .then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los proyectos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los proyectos",
      error: error
    });
  }
}; // Function that get projects by worker


projectFunctions.getProjectsByWorker = function (req, res) {
  var id = req.params.worker;

  try {
    _connection["default"].any("SELECT p.id_project, p.name_project\n                  FROM projects p \n                  INNER JOIN workerproject wp ON p.id_project = wp.id_project\n                  INNER JOIN statusproject sp ON sp.id_status = p.id_project \n                  WHERE wp.id_worker = $1\n                  GROUP BY p.id_project, p.name_project", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los proyectos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los proyectos",
      error: error
    });
  }
}; // Function that get project and status by worker


projectFunctions.getProjectAndStatussByWorker = function (req, res) {
  var id = req.params.worker;

  try {
    _connection["default"].any("SELECT p.name_project, TO_CHAR( p.deliverydate,'DD-MM-YYYY') as deliveryDate, s.name_status \n                  FROM projects p \n                  INNER JOIN workerproject w ON p.id_project = w.id_project\n                  INNER JOIN statusproject s2 ON w.id_project = s2.id_project \n                  INNER JOIN status s ON s2.id_status = s.id_status \n                  WHERE date_project = (select MAX(s2.date_project) FROM statusproject s2 WHERE s2.id_project = p.id_project ) AND w.id_worker =$1\n                  GROUP BY p.name_project, deliveryDate, s.name_status ", [id]).then(function (data) {
      return res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        msg: "Error al obtener los proyectos",
        error: error
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los proyectos",
      error: error
    });
  }
};

var _default = projectFunctions;
exports["default"] = _default;