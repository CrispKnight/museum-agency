import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { validToken } from '../../utils/helpers';

const handler = async (req, res) => {
    if (req.method !== 'POST') return;

    const admin = process.env.ADMIN;

    if (admin === req.body.user) {
        const email_address = process.env.EMAIL_ADDRESS;
        const email_password = process.env.EMAIL_PASSWORD;
        const secret = process.env.SECRET;
        const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '2h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email_address,
                pass: email_password,
            },
        });

        try {
            await transporter.sendMail({
                from: { name: 'Museum Agency', address: email_address },
                to: email_address,
                subject: 'Музейное Агентство: авторизация',
                html: `<a href="http://localhost:3000/projects?token=${token}">Войти на сайт</a>`,
            });

            return res.status(200).json({
                status: 'success',
                message: 'Email was sent successfully!',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'error',
                message: 'Something went wrong!',
            });
        }
    }

    const authHeader = req.headers?.['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token || !validToken(token)) return res.status(403).end();

    return res.status(200).json({ success: true });
};

export default handler;
