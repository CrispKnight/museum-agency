import { validToken } from '../../utils/helpers';

const handler = async (req, res) => {
    if (req.method !== 'DELETE') return;

    const authHeader = req.headers?.['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token || !validToken(token)) return res.status(403).end();

    const { imageNames } = req.body;

    const responce = await fetch('http://localhost:4000/museum-agency', {
        method: 'DELETE',
        body: JSON.stringify({ fileNames: imageNames }),
        headers: {
            'Content-Type': 'application/json',
            api_key: process.env.FS_API_KEY,
        },
    });

    if (!responce.ok) {
        res.status(500).end();
    }

    res.status(200).end();
};

export default handler;
