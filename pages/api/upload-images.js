import formidable from 'formidable';
import FormData from 'form-data';
import sharp from 'sharp';
import fs from 'fs';

import { validToken } from '../../utils/helpers';

const reconstructData = (parsedData) => {
    let newData = new FormData();

    Object.entries(parsedData.fields).forEach((element) => {
        newData.append(element[0], element[1]);
    });

    Object.entries(parsedData.files).forEach((element) => {
        const readStream = fs.createReadStream(element[1].filepath);
        const transform = sharp().resize(1080, 720);
        const resizedImage = readStream.pipe(transform);
        newData.append(element[0], resizedImage, element[1].originalFilename);
    });

    return newData;
};

const handler = (req, res) => {
    if (req.method !== 'POST') return;

    const authHeader = req.headers?.['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token || !validToken(token)) return res.status(403).end();

    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (!files.files?.length) {
            files.files = [files.files];
        }

        const data = reconstructData({
            files: files.files,
            fields,
        });

        const responce = await fetch('http://localhost:4000/museum-agency', {
            method: 'POST',
            body: data,
            headers: { api_key: process.env.FS_API_KEY },
        });

        const jsonRes = await responce.json();

        return res.status(responce.status).json(jsonRes);
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
