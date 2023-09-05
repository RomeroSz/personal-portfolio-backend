import express from 'express';
import cors from 'cors';
import routes from './routes/mainroutes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);

// Inicia el servidor
const port = 3000; // Puedes cambiar el número de puerto si es necesario
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
