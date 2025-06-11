const socket = io();

// creamos una varieble para almacenar los ususarios
let users;

const chatBox = document.getElementById("chatBox");
//sweet alert 2 para el usuario

Swal.fire({
  title: "Identifícate",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    return !value && "¡Necesitas ingresar un nombre de usuario!";
  },
  allowOutsideClick: false,
}).then((result) => {
  users = result.value;
  socket.emit("nuevoUsuario", users);
});
// Escuchamos el evento mensajes para recibir los mensajes del servidor

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      // Emitimos el mensaje al servidor
      socket.emit("nuevoMensaje", {
        user: users,
        message: chatBox.value,
      });
      chatBox.value = ""; // Limpiamos el campo de entrada
    }
  }
});

// Escuchamos el evento messagesLogs para recibir los mensajes del servidor
socket.on("messagesLogs", (data) => {
  let log = document.getElementById("messagesLogs");
  let allMessages = "";

  // Iteramos sobre cada 'message' individual en el array 'data'
  data.forEach((message) => {
    allMessages += `${message.user} dice: ${message.message} <br />`;
  });

  // Asegúrate de que el elemento 'log' existe antes de intentar modificarlo
  console.log(log);
  console.log(allMessages);

  log.innerHTML = allMessages;
});
