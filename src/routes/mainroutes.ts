import express from 'express';
const router = express.Router();
import { enviarCorreo } from '../../services/emailService';

router.post('/enviar-correo', enviarCorreo);

export default router;
