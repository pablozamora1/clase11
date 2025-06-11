import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
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


const io = new Server(httpServer);

let mensajes = [];
// Manejo de eventos de Socket.IO 
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  
  // Manejar el evento de nuevo mensaje
  socket.on("nuevoMensaje", (mensaje) => {
    mensajes.push(mensaje);
    io.emit("messagesLogs", mensajes); // Emitir a todos los clientes conectados
  });

});