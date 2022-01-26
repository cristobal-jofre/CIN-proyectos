import fs from "fs";
import { google } from "googleapis";
import GDriveUtil from "gdrive-utils";
import credentials from "../../credentials.json";
import auth_token from "../token.json";

const gdriveUtil = new GDriveUtil(credentials, auth_token);

const googleValidation = () => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );
    oAuth2Client.setCredentials(gdriveUtil.oauth2Client.credentials);
    return oAuth2Client;
};

export const createFolder = (projectName) => {
    return new Promise((resolve, reject) => {
        const fileMetadata = {
            name: projectName,
            mimeType: "application/vnd.google-apps.folder",
        };

        const auth = googleValidation();
        const drive = google.drive({ version: "v3", auth });

        drive.files.create(
            {
                resource: fileMetadata,
                fields: "id",
            },
            (err, file) => {
                if (err) {
                    reject({
                        status: false,
                        error: err,
                    });
                }
                resolve({
                    status: true,
                    file: file.data.id,
                });
            }
        );
    });
};

export const uploadFileFunction = (idFolder, fileName, path, mimeType) => {
    return new Promise((resolve, reject) => {
        const auth = googleValidation();
        const fileMetadata = {
            name: fileName,
            parents: [idFolder],
        };

        const media = {
            mimeType: [mimeType],
            body: fs.createReadStream(path),
        };

        const drive = google.drive({ version: "v3", auth });
        drive.files.create(
            {
                resource: fileMetadata,
                media,
                fields: "id",
            },
            (err, file) => {
                if (err) {
                    reject({
                        status: false,
                        error: err,
                    });
                }
                resolve({
                    status: true,
                    file: file.data.id,
                });
            }
        );
    });
};
