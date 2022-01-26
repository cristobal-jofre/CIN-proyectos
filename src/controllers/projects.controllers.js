import connection from '../database/connection';

let projectFunctions = {};

// Function that insert project

projectFunctions.insertProject = (req, res) => {
    try {
        let name = req.body.projectName;
        let external = req.body.external;
        let balance = req.body.initialBalance;
        let deliveryDate = req.body.deadlineDate;
        let estimate = req.body.budget;
        let clientID = req.body.idClient;

        connection
            .none(
                `INSERT INTO public.projects(name_project,externos_n,balance,deliveryDate,estimate,id_company) VALUES ($1,$2,$3,$4,$5,$6)`,
                [name, external, balance, deliveryDate, estimate, clientID]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Proyecto creado exitosamente",
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al registrar un proyecto",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrió un error al registrar un proyecto",
            err,
        });
    }
};

projectFunctions.insertProjectWithStatus = (req, res) => {
    try {
        let projectID = req.body.projectID;
        let projectDate = req.body.projectDate;
        let statusID = 1;

        connection
            .none(
                'INSERT INTO public.statusproject (id_status,id_project,date_project) VALUES ($1,$2,$3)',
                [statusID, projectID, projectDate]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Proyecto registrado exitosamente",
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al registrar un proyecto",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrió un error al registrar un proyecto",
            err,
        });
    }
};

projectFunctions.insertWorkersToProject = (req, res) => {
    try {
        let projectID = req.body.projectID;
        let workerID = req.body.workerID;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        connection
            .none(
                'INSERT INTO public.workerproject (id_worker,id_project,start_date,date_end) VALUES ($1,$2,$3,$4)',
                [workerID, projectID, startDate, endDate]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Trabajador ha sido agregado al proyecto exitosamente",
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al agregar un trabajador al proyecto",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrió un error al agregar un trabajador al proyecto",
            err,
        });
    }
};

projectFunctions.insertInterestsToProject = (req, res) => {
    try {
        let projectID = req.body.projectID;
        let interestID = req.body.interestID;

        connection
            .none(
                'INSERT INTO public.projectinterest (id_project,id_interest) VALUES ($1,$2)',
                [projectID, interestID]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Interés ha sido agregado al proyecto exitosamente",
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al agregar un interés al proyecto",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrió un error al agregar un interés al proyecto",
            err,
        });
    }
};

projectFunctions.getProjectsNameAndID = (req, res) => {
    try {
        connection
            .any("SELECT id_project, name_project FROM public.projects")
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los proyectos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los proyectos",
            error,
        });
    }
};

// Function that get all projects

projectFunctions.getProjects = (req, res) => {
    try {
        connection
            .any(`SELECT  p.id_project,name_project,  balance , TO_CHAR( deliverydate,'DD-MM-YYYY') AS deliveryDate,  estimate , s3.name_status  AS status 
                  FROM projects p
                  INNER JOIN statusproject s ON p.id_project = s.id_project
                  INNER JOIN status s3 ON s3.id_status = s.id_status
                  WHERE date_project = (select MAX(s2.date_project) FROM statusproject s2 WHERE s2.id_project = p.id_project )`) 
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {

                return res.status(400).json({
                    msg: "Error al obtener los proyectos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los proyectos",
            error,
        });
    }
};

projectFunctions.getInterestByProjects = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any(`SELECT p2.estimate 
                 FROM projectinterest p
                 INNER JOIN projects p2 ON p.id_project = p2.id_project 
                 WHERE p2.id_project = $1
                 GROUP BY p2.estimate`, [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los proyectos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los proyectos",
            error,
        });
    }
};

// Function that get projects by id

projectFunctions.getProjectById = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any(`SELECT name_project,balance,TO_CHAR( deliverydate,'DD-MM-YYYY') as deliveryDate,estimate,status 
                  FROM public.projects 
                  WHERE id_project = $1`, [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los proyectos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los proyectos",
            error,
        });
    }
};

// Function that get workers by project

projectFunctions.getWorkersByProjects = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any(`SELECT w2.rut ,w2.name,w2.email, w2.id_worker 
                  FROM workerproject w 
                  INNER JOIN workers w2 ON w.id_worker = w2.id_worker 
                  WHERE w.id_project = $1`, [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los trabajadores de un proyecto",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los trabajadores de un proyecto",
            error,
        });
    }
};

// Function that get documents by projects

projectFunctions.getDocumentsByProjects = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any(`SELECT d.dirdoc, TO_CHAR( d.datedoc,'DD-MM-YYYY') as datedoc
                  FROM documents d 
                  INNER JOIN projects p ON p.id_project = d.id_project 
                  WHERE d.id_project = $1`, [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los documentos de un proyecto",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los documentos de un proyecto",
            error,
        });
    }

};

// Function that delete projects by id

projectFunctions.deleteProjectById = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any("DELETE FROM public.projects WHERE id_project = $1 ", [id]) // TODO: Eliminar la referencia a workers
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los proyectos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los proyectos",
            error,
        });
    }
};

// Function that get projects by worker

projectFunctions.getProjectsByWorker = (req, res) => {
    let id = req.params.worker;

    try {
        connection
            .any(`SELECT p.id_project, p.name_project
                  FROM projects p 
                  INNER JOIN workerproject wp ON p.id_project = wp.id_project
                  INNER JOIN statusproject sp ON sp.id_status = p.id_project 
                  WHERE wp.id_worker = $1
                  GROUP BY p.id_project, p.name_project`, [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los proyectos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los proyectos",
            error,
        });
    }
};

// Function that get project and status by worker

projectFunctions.getProjectAndStatussByWorker = (req, res) => {
    let id = req.params.worker;

    try {
        connection
            .any(`SELECT p.name_project, TO_CHAR( p.deliverydate,'DD-MM-YYYY') as deliveryDate, s.name_status 
                  FROM projects p 
                  INNER JOIN workerproject w ON p.id_project = w.id_project
                  INNER JOIN statusproject s2 ON w.id_project = s2.id_project 
                  INNER JOIN status s ON s2.id_status = s.id_status 
                  WHERE date_project = (select MAX(s2.date_project) FROM statusproject s2 WHERE s2.id_project = p.id_project ) AND w.id_worker =$1
                  GROUP BY p.name_project, deliveryDate, s.name_status `, [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los proyectos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los proyectos",
            error,
        });
    }
};

projectFunctions.saveBilling = (req, res) => {
    try {
        const { project, pago, gastos, workers, fechaI, fechaF } = req.body;
        connection.any(`SELECT i.percentage
                       FROM interest i INNER JOIN projectinterest pi ON i.id_interest = pi.id_interest
                       WHERE pi.id_project = $1`, project)
                .then(data => {
                    let totalInterest = 0;
                    data.map(interest => {
                        totalInterest += pago * (interest.percentage/100);
                    });

                    let totalSueldos = 0;
                    workers.map(worker => {
                        totalSueldos += parseInt(worker.sueldo);
                    });

                    connection.none(`INSERT INTO billing (id_project, gross_pay, interest_pay, salary_pay, expenses, fecha_inicio, fecha_termino) 
                                     VALUES ($1, $2, $3, $4, $5, $6, $7)`, [project, parseInt(pago), totalInterest, totalSueldos, parseInt(gastos), fechaI, fechaF])
                    .then(() => {
                        connection.tx(t => {
                            let queries = [];
                            workers.map(worker => {
                                queries.push(t.none(`INSERT INTO public.payment (id_worker, id_project, amount) VALUES ($1, $2, $3)`, [worker.id, project, worker.sueldo]))
                            });

                            return t.batch(queries);
                        })
                        .then(() => {
                            let total = parseInt(totalSueldos) + parseInt(totalInterest) + parseInt(gastos);
                            connection.none(`UPDATE projects SET balance = balance - $1 WHERE id_project = $2`, [total, project])
                            .then(() => {
                                return res.status(201).json({
                                    msg: 'Facturación ingresada exitosamente'
                                });
                            })
                            .catch(err => {
                                return res.status(400).json({
                                    msg: "Error actualizar el saldo del proyecto",
                                    error: err,
                                });
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                msg: "Error registrar los sueldos",
                                error: err,
                            });
                        })
                    })
                    .catch(err => {
                        return res.status(400).json({
                            msg: "Error crear la facturación",
                            error: err,
                        });
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        msg: "Error obtener los intereses",
                        error: err,
                    });
                })
    } catch (error) {
        return res.status(500).json({
            msg: "Error crear la facturación",
            error,
        });
    }
};

export default projectFunctions;