import connection from '../database/connection';

let paymentFunctions = {};

// Function that get payments

paymentFunctions.getPayments = (req, res) => {
    try {
        connection
            .any(`SELECT * FROM payment`) 
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
    
                return res.status(400).json({
                    msg: "Error al obtener los pagos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los pagos",
            error,
        });
    }
};

// Function that get payments by worker

paymentFunctions.getPaymentsByWorker = (req, res) => {
    let id = req.params.id
    try {
        connection
            .any(`SELECT pr.name_project, TO_CHAR( p.date_pay,'DD-MM-YYYY') as datepay, p.amount 
                 FROM payment p
                 INNER JOIN projects pr on pr.id_project = p.id_project 
                 WHERE p.id_worker = $1`, [id])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los pagos",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los pagos",
            error,
        });
    }
};

// Function that insert payment

paymentFunctions.insertPayment = (req, res) => {
    try {
        const { idWorker, idProject, amount } = req.body;

        connection
            .none(
                `INSERT INTO public.payment (id_worker, id_project, amount) VALUES ($1, $2, $3)`,
                [idWorker, idProject, amount]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Pago creado exitosamente",
                });
            })
            .catch((err) => { 
                return res.status(400).json({
                    msg: "Ocurrio un error al registrar el pago",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrio un error al registrar el pago",
            err,
        });
    }
}

export default paymentFunctions;