import connection from "../database/connection";

let interestFunctions = {};

interestFunctions.insertInterest = async (req, res) => {
    try {
        let name = req.body.interestName;
        let area = req.body.interestArea;
        let percentage = req.body.interestPercentage;

        connection
            .none(
                'INSERT INTO public.interest (name, area, percentage) VALUES ($1, $2, $3)',
                [name, area, percentage]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Interés creado exitosamente",
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    msg: "Ocurrio un error al agregar un interés",
                    err,
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Ocurrio un error al agregar un interés",
            err,
        });
    }
};

interestFunctions.getInterests = (req, res) => {
    try {
        connection
            .any("SELECT id_interest, name, area, percentage FROM public.interest")
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los intereses",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los intereses",
            error,
        });
    }
};

interestFunctions.getInterestById = (req, res) => {
    let id = req.params.id;

    try {
        connection
            .any("SELECT id_interest, name, area, percentage FROM public.interest WHERE id_interest = $1", [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los intereses",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los intereses",
            error,
        });
    }
};

interestFunctions.editInterest = (req, res) => {
    try {
        let name = req.body.interestName;
        let area = req.body.interestArea;
        let percentage = req.body.interestPercentage;
        let id = req.body.id;

        connection
            .none(
                `UPDATE public.interest SET name = $1, area = $2, percentage = $3 WHERE id_interest = $4`,
                [name, area, percentage, id]
            )
            .then(() => {
                return res.status(200).json({
                    msg: "Interés editado exitosamente",
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al editar un interés",
                    err,
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Ocurrió un error al editar un interés",
            err,
        });
    }
};

interestFunctions.deleteInterest = (req, res) => {

    req.body = JSON.parse(req.body.data);

    let id = req.body.id;

    try {
        connection
            .any("DELETE FROM public.interest WHERE id_interest = $1 ", [id])
            .then((data) => {
                return res.status(200).json({
                    msg: "Interés eliminado exitosamente"
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al eliminar un interés",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Ocurrió un error al eliminar un interés",
            error,
        });
    }
};

export default interestFunctions;