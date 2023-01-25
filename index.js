import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import { dbConnection } from "./database/config.js";

//Inicializar express
const app = express();

//Inicializar dotenv
dotenv.config();

//Variables de entorno
const PORT = process.env.PORT;

//Conexión a la BD
dbConnection();

//CORS
app.use(cors())

//Directorio público
app.use(express.static("public"));

//Middleware
app.use(express.json());

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);

//Escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
