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
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Correo electrónico inválido' });
    }
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'victoromero2505@gmail.com',
        subject: `**MENSAJE DEL PORTAFOLIO** ----->${email}`,
        priority: 'high',
        html: `
      <h2>Detalles del mensaje:</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
      `,
    };
    res.status(200).json({ message: 'Correo electrónico enviado correctamente',  mailOptions});
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.error('Error al enviar el correo electrónico:', error);
    //         res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    //     } else {
    //         console.log('Correo electrónico enviado:', info.response);
    //         res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    //     }
    // });
};


module.exports = { enviarCorreo };
