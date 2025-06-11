import express from "express";
import { engine } from "express-handlebars";
import { Socket } from "socket.io";
import viewRoutes from "./routes/views.routes.js";

const app = express();
const PUERTO = 8080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

// Configuración de Socket.IO
app.use("/", viewRoutes);

// Configuración del Socket.IO
const httpServer = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
