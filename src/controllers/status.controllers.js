import connection from "../database/connection";

let statusFunctions = {};

// Function that get status from projects

statusFunctions.getStatusProjects = (req, res) => {
    try {
        connection
            .any(`SELECT * FROM status s`)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los estados de un proyecto",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los estados de un proyecto",
            error,
        });
    }
};

// Function that change status

statusFunctions.changeStatus = (req, res) => {
    try {
        const { state, idProject } = req.body;

        connection
            .any(`INSERT INTO statusproject (id_status,id_project) VALUES ($1,$2) RETURNING *`, [
                state,
                idProject,
            ])
            .then((data) => {
                return res.status(201).json({
                    msg: "Estado cambiado existosamente",
                });
            })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({
                    msg: "Error al cambiar el estado de un proyecto",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al cambiar el estado de un proyecto",
            error,
        });
    }
};

export default statusFunctions;
