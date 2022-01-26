import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../database/connection';
import { secretToken } from '../config.json';

// Function that encrypt password

export const encryptPassword = async (password) => {
    const salt = await Bcrypt.genSalt(10);
    const passwordHash = await Bcrypt.hash(password, salt);

    return [passwordHash, salt];
};

// Function that match password

export const matchPassword = async (password, password_hash) => {
    return await Bcrypt.compare(password, password_hash);
};

// Function that generate token

export const generateToken = rut => {
    return jwt.sign({
        rut,
    },
        secretToken, {
        expiresIn: '2h'
    }
    );
};

// Function that verify if user is autenticated

export const isAutenticated = (req, res, next) => {
    const token = req.cookies.auth || undefined;
    if (!token) {
        return res.status(403).json({
            msg: 'Acceso denegado'
        })
    }
    jwt.verify(token, secretToken, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                msg: 'La sesión expiró, vuelva a iniciar sesión para continuar.'
            })
        }
        const {
            rut
        } = decoded;
        connection
            .one(`SELECT * 
                  FROM public.user
                  WHERE rut = $1`, rut)
            .then((user) => {
                req.user = user;
                next();
            })
            .catch((error) => {
                res.status(500).json({
                    msg: 'Su sesión ha expirado',
                    error,
                });
            });
    });
};

// Function that execute a form validator

export const requestFormValidation = (preValidation, callback) => {
    return (req, res, next) => {
        if (req.body && req.body.data)
            req.body = JSON.parse(req.body.data);
        const formValidation = preValidation(req.body, req.method);
        if (formValidation.isValid)
            return callback(req, res, next);
        res.status(400).json(formValidation);
    };
};