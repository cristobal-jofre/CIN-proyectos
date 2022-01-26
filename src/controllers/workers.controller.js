import connection from '../database/connection';

let workerFunctions = {};

// Function that insert worker

workerFunctions.insertWorker = (req, res) => {
    try {
        const { rut, name, email } = req.body;

        connection
            .none(
                `INSERT INTO public.workers(rut,name,email) VALUES ($1,$2,$3)`,
                [rut, name, email]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Trabajador creado exitosamente",
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    msg: "Ocurrio un error al registrar un trabajador",
                    err,
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Ocurrio un error al registrar un trabajador",
            err,
        });
    };
};

// Function that get workers

workerFunctions.getWorkers = (req, res) => {
    try {
        connection
            .any("SELECT id_worker,rut,name,email FROM public.workers")
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los trabajadores",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los trabajadores",
            error,
        });
    }
};

// Function that get worker by id

workerFunctions.getWorkerById = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any("SELECT rut,name,email FROM public.workers WHERE id_worker = $1", [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los trabajadores",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los trabajadores",
            error,
        });
    }
};

workerFunctions.editWorker = (req, res) => {
    try {

        const { rut, name, email, id } = req.body

        connection
            .none(
                `UPDATE public.workers 
                SET name = $1, rut = $2, email = $3 
                WHERE id_worker = $4`,
                [name, rut, email, id]
            )
            .then(() => {
                return res.status(200).json({
                    msg: "Trabajador editado exitosamente",
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    msg: "Ocurrió un error al editar un trabajador",
                    err,
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Ocurrió un error al editar un trabajador",
            err,
        });
    }
};

workerFunctions.deleteWorkerById = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any("DELETE FROM public.workers WHERE id_worker = $1 ", [id]) // TODO: Eliminar la referencia a workers
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({
                    msg: "Error al obtener los trabajadores",
                    error,
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error al obtener los trabajadores",
            error,
        });
    }
};

export default workerFunctions;