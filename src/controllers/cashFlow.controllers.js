import connection from '../database/connection';

let cashFlowFunctions = {};

// Function that get payments

cashFlowFunctions.getBillingByProject = (req, res) => {
    try {
        const { id } = req.params;
        connection
            .any(`SELECT b.id_billing, concat(to_char(b.fecha_inicio,'DD-MM-YYYY'),' hasta ', to_char(b.fecha_termino,'DD-MM-YYYY')) AS label
                  FROM billing b 
                  WHERE b.id_project = $1`, id)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {

                return res.status(400).json({
                    msg: "Error al obtener las facturaciones",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener las facturaciones",
            error,
        });
    }
};

cashFlowFunctions.getBilling = (req, res) => {
    try {
        const { id } = req.params;
        connection
            .any(`select b.id_billing, concat(to_char(b.fecha_inicio,'DD-MM-YYYY'),' hasta ', to_char(b.fecha_termino,'DD-MM-YYYY')) as fecha, b.gross_pay, b.interest_pay, b.expenses, b.salary_pay, (b.interest_pay + b.expenses + b.salary_pay) as totalExpenses
            from billing b 
            where b.id_billing = $1`, id)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {

                return res.status(400).json({
                    msg: "Error al obtener las facturaciones",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener las facturaciones",
            error,
        });
    }
};

export default cashFlowFunctions;