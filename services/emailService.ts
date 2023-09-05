import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const enviarCorreo = (req: Request, res: Response) => {
    const { nombre, correo, mensaje } = req.body;

    const mailOptions: any = {
        from: process.env.EMAIL,
        to: 'victoromero2505@gmail.com',
        subject: `**MENSAJE DEL PORTFOLIO** ----->${correo}`,
        priority: 'high',
        html: `
        <h2>Detalles del mensaje:</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        } else {
            console.log('Correo electrónico enviado:', info.response);
            res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
        }
    });
};

module.exports = { enviarCorreo };
