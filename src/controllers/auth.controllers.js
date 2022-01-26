import connection from '../database/connection';
import { matchPassword, generateToken } from '../helpers/helpersFunctions';

let authFunctions = {};

authFunctions.login = (req, res) => {
    try {
        const { rut, passwd } = req.body;
        
        connection
            .oneOrNone("SELECT * FROM public.user WHERE rut = $1", rut)
            .then(async (user) => {
                if (user) {
                    const { isActive, passwordHash, rut } = user;
                    if (isActive) {
                        const match = await matchPassword(passwd, passwordHash);

                        if (match) {
                            const token = generateToken(rut);
                            res.cookie('auth', token);
                            return res.status(200).json({
                                token,
                                msg: 'Sesión iniciada exitosamente'
                            });
                        } else {
                            return res.status(400).json({
                                msg: "Contraseña incorrecta",
                            });
                        }
                    } else {
                        return res.status(400).json({
                            msg: "Usuario se encuentra bloqueado",
                        });
                    }
                } else {
                    return res.status(400).json({
                        msg: "Usuario incorrecto",
                    });
                }
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: "Error al iniciar sesión",
                    err,
                });
            });
    } catch (err) {
        return res.status(500).json({
            msg: "Error al iniciar sesión",
            err,
        });
    }
};


export default authFunctions;