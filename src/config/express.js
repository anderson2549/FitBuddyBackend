import userRouter from '#Routes/user.routes.js';
import express from 'express';

const expressApp = express();

// Middlewares
expressApp.use(express.json());

// Routes
expressApp.use('/user', userRouter);



// Middleware para manejar rutas no existentes
expressApp.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: 'Ruta no encontrada',
  });
});

// Middleware para manejar errores
expressApp.use((err, req, res, next) => {
  console.error(err.stack); // Log del error en la consola
  res.status(500).json({
    error: true,
    message: 'Ocurrió un error en el servidor',
  });
});

// expressApp.
export default expressApp;
