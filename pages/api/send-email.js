import nodemailer from 'nodemailer';

const handler = async (req, res) => {
    if (req.method !== 'POST') return;

    const email_address = process.env.EMAIL_ADDRESS;
    const email_password = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_address,
            pass: email_password,
        },
    });

    try {
        const result = await transporter.sendMail({
            from: { name: req.body.name, address: req.body.email },
            to: email_address,
            subject: `Музейное агентство: сообщение от <${req.body.email}>`,
            text: req.body.message,
            replyTo: `${req.body.email}`,
        });

        res.status(200).json({
            status: 'success',
            message: 'Email was sent successfully!',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
};

export default handler;
