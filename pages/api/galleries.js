import { connectDB, Gallery } from '../../utils/db-utils';
import { validToken } from '../../utils/helpers';

const handler = async (req, res) => {
    try {
        connectDB();
    } catch (error) {
        return res.status(500).end;
    }

    if (req.method === 'GET') {
        const galleries = await Gallery.find().sort({ date: -1 });

        res.status(200).json(galleries);
    }

    const authHeader = req.headers?.['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token || !validToken(token)) return res.status(403).end();

    const gallery = req.body;

    if (req.method === 'POST') {
        gallery.date = new Date(gallery.date);

        try {
            await Gallery(gallery).save();

            return res.status(201).json({
                status: 'success',
                message: 'Gallery created successfully.',
            });
        } catch (error) {
            return res.status(500).end;
        }
    }

    if (req.method === 'DELETE') {
        try {
            await Gallery.findByIdAndDelete(gallery.id);

            return res.status(204).end();
        } catch (error) {
            return res.status(500).end;
        }
    }
};

export default handler;
