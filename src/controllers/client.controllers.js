import connection from '../database/connection'

let clientFunctions = {};

clientFunctions.insertClient = async (req, res) => {
    try {
        let clientName = req.body.clientName;
        let contact = req.body.contact;

        connection
            .none(
                'INSERT INTO public.company (contact, name) VALUES ($1, $2)',
                [contact, clientName]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Cliente creado exitosamente"
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al agregar un cliente",
                    err
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrió un error al agregar un cliente",
            err
        });
    }
};

clientFunctions.getClients = (req, res) => {
    try {
        connection
            .any("SELECT id_company, contact, name FROM public.company")
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al obtener los clientes",
                    err
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrió un error al obtener los clientes",
            err
        });
    }
};

clientFunctions.checkIfClientExists = (req, res) => {
    try {
        let clientName = req.params.name;

        connection
            .any("SELECT COUNT(*) FROM public.company WHERE name = $1", [clientName])
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrió un error al chequear si el cliente existe",
                    err
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrió un error al chequear si el cliente existe",
            err
        });
    }
};

export default clientFunctions;