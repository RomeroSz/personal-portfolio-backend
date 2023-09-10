"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarCorreo = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
const enviarCorreo = (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'victoromero2505@gmail.com',
        subject: `**MENSAJE DEL PORTFOLIO** ----->${email}`,
        priority: 'high',
        html: `
        <h2>Detalles del mensaje:</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        }
        else {
            console.log('Correo electrónico enviado:', info.response);
            res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
        }
    });
};
exports.enviarCorreo = enviarCorreo;
module.exports = { enviarCorreo: exports.enviarCorreo };
