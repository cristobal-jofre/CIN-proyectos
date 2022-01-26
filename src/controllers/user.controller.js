import connection from '../database/connection';
import { encryptPassword } from '../helpers/helpersFunctions';

let userFunctions = {};

// Function that insert user

userFunctions.insertUser = async (req, res) => {
    try {
        const { rut, password, name, email } = req.body;

        const [passwordHash, salt] = await encryptPassword(password);

        connection
            .none(
                `INSERT INTO public.user (rut, password_hash, salt, is_active, email, name) VALUES ($1, $2, $3, $4, $5, $6)`,
                [rut, passwordHash, salt, true, email, name]
            )
            .then(() => {
                return res.status(201).json({
                    msg: "Usuario creado exitosamente",
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrio un error al registrar un usuario",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrio un error al registrar un usuario",
            err,
        });
    }
};

// Function that get users

userFunctions.getUsers = (req, res) => {
    try {
        connection
            .any("SELECT user_id, rut, name, is_active, email FROM public.user")
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: "Error al obtener los usuarios",
                    error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los usuarios",
            error,
        });
    }
};

// Function that change state

userFunctions.changeState = (req, res) => {
    try {
        req.body = JSON.parse(req.body.data);

        const { state, id } = req.body;

        connection.none('UPDATE public.user SET is_active = not is_active WHERE user_id = $2', [state, id])
            .then(() => {
                return res.status(200).json({
                    msg: 'Estado cambiado exitosamente'
                });
            })
            .catch(error => {
                return res.status(400).json({
                    msg: "Error al obtener los usuarios",
                    error,
                });
            })
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los usuarios",
            error,
        });
    }
};

// Function that edit user

userFunctions.editUser = (req, res) => {
    try {

        const { rut, name, email, id } = req.body;

        connection
            .none(
                `UPDATE public.user 
                SET name = $1, rut = $2, email = $3 
                WHERE user_id = $4`,
                [name, rut, email, id]
            )
            .then(() => {
                return res.status(200).json({
                    msg: "Usuario editado exitosamente",
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Ocurrio un error al editar un usuario",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Ocurrio un error al editar un usuario",
            err,
        });
    }
};

export default userFunctions;