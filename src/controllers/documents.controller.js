import fs from 'fs';
import connection from '../database/connection';
import { createFolder, uploadFileFunction } from '../middleware/DriveApi';
import { staticFolderPath } from '../config.json';

let documentsFunctions = {};

const generateFile = (name, file) => {
    const route = staticFolderPath + '/' + name;
    fs.writeFile(route, file, (err) => {
        if (err) {
            throw new Error('Error al procesar el archivo');
        }
    });

    return route;
};

const updateDocumentDb = (idFile, idProject) => {
    return new Promise((resolve, reject) => {
        connection.none('INSERT INTO documents (dirdoc, id_project, datedoc) VALUES ($1, $2, NOW())', [idFile, idProject])
            .then(() => {
                resolve();
            })
            .catch(err => {
                console.log(err)
                reject(err);
            })
    })
}

documentsFunctions.uploadDocument = (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const { idProject, nameProject } = data;
        const { files } = req.files;
        connection.one('SELECT idfolder FROM projects WHERE id_project = $1', idProject)
            .then(value => {
                const { idfolder } = value;
                if (idfolder == null) {
                    createFolder(nameProject)
                        .then(folder => {
                            connection.none('UPDATE projects SET idfolder = $1 WHERE id_project = $2', [folder.file, idProject])
                                .then(() => {
                                    const path = generateFile(files.name, files.data);
                                    uploadFileFunction(folder.file, files.name, path, files.mimetype)
                                        .then(response => {
                                            updateDocumentDb(response.file, idProject)
                                                .then(() => {
                                                    fs.unlinkSync(path);
                                                    return res.status(201).json({
                                                        msg: "Documento subido exitosamente"
                                                    });
                                                })
                                                .catch(err => {
                                                    return res.status(400).json({
                                                        msg: "Ocurrió un error al subir el documento en la base de datos",
                                                        error: err
                                                    });
                                                });
                                        })
                                        .catch(err => {
                                            return res.status(400).json({
                                                msg: "Ocurrió un error al subir el archivo",
                                                error: err
                                            });
                                        })
                                })
                                .catch(err => {
                                    return res.status(400).json({
                                        msg: "Ocurrió un error al actualizar la carpeta del proyecto",
                                        error: err
                                    });
                                })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                msg: "Ocurrió un error al crear la carpeta",
                                error: err
                            });
                        })
                } else {
                    const path = generateFile(files.name, files.data);
                    uploadFileFunction(idfolder, files.name, path, files.mimetype)
                        .then(response => {
                            updateDocumentDb(response.file, idProject)
                                .then(() => {
                                    fs.unlinkSync(path);
                                    return res.status(201).json({
                                        msg: "Documento subido exitosamente"
                                    });
                                })
                                .catch(err => {
                                    return res.status(400).json({
                                        msg: "Ocurrió un error al subir el documento en la base de datos",
                                        error: err
                                    });
                                });
                        })
                        .catch(err => {
                            return res.status(400).json({
                                msg: "Ocurrió un error al subir el archivo",
                                error: err
                            });
                        })
                }
            })
            .catch(err => {
                return res.status(400).json({
                    msg: "Ocurrió un error al obtener los datos del proyecto",
                    error: err
                });
            })
    } catch (error) {
        return res.status(500).json({
            msg: "Ocurrió un error al subir documento",
            error
        });
    }
};


export default documentsFunctions;