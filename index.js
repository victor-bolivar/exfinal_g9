// Servidor express
const express = require('express')
const app = express()
const port = 3001

// Socket.io
const http = require("http");
const socketIO = require("socket.io");
let servidorHttp = http.Server(app);
let socketio = socketIO(servidorHttp);

// Rutas
app.get('/login', (req,res) => {res.sendFile(__dirname + "/login.html")})
app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))


//levantando el server
servidorHttp.listen(3001, function () {
    console.log("Servidor arriba");
});

// Para llevar la cuenta de el numero de clientes conectados
let cantidadClientesConectados = 0;

// Socket.io
socketio.on('connection', function (websocket) {

    // conexion de usuario
    // TODO nombre a recibir del logueo
    let nombreCliente = "Advincula";
    console.log("Usuario conectado");
    cantidadClientesConectados++;
    socketio.emit("conectados",cantidadClientesConectados);

    // se usa el usuario para asignarlos a un room
    // En este caso se hace uso de rooms para enviar la respuestas de los comandos solo al usuario en especifico
    websocket.on('join', function (data) {
        websocket.join(nombreCliente); 
      });

    // TODO desconexion de usuario
    websocket.on("disconnect", function () {
        console.log("usuario " + nombreCliente + " desconectado");
        cantidadClientesConectados--;
        socketio.emit("conectados",cantidadClientesConectados);
    });

    // mensaje recibido de usuario
    websocket.on("mensaje de chat", function (mensaje) {
        let dateTime = getDateAndTime();

        if(mensaje== "hielo" || mensaje=="crash" || mensaje == "chetos"){
            // TODO logout y redireccion
        }

        //validar si se trata de un comando
        let resultado = validarComando(mensaje)
        if(resultado[0] == false){
            socketio.emit("mensaje broadcast", nombreCliente + " "+dateTime+": "+mensaje);
        } else {
            socketio.emit("mensaje broadcast", "Sistema "+dateTime+": "+resultado[1]);
        }

    });

    // mensaje del sistema cada 1 min
    const mensajes = [
        'hoy sera un buen dia',
        'acaso te llamas fe? porque eres lo mas lindo de la vida',
        'con fe apruebas campos',
        '1% probabilidades 99% de fe',
        'buenos dias master',
        'espero cumplas todas tus metas',
        'recuerda tomar agua',
        'viva la vida, y no dejes que la vida te viva -Albert einsten 2010',
        'sigue adelante!',
        'no dejes para mañana lo que puedes dejar para pasado mañana',
        'sale dotita?'
    ]
    setInterval(() => {
        let mensaje = mensajes[Math.floor(Math.random()*mensajes.length)];
        let dateTime = getDateAndTime();
        socketio.emit('mensaje broadcast', "Sistema "+dateTime+": "+mensaje)}
    , 60 * 1000);

    
});

// Funciones auxiliares
function getDateAndTime(){
    let currentdate = new Date(); 
    return "(" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+")";
}
function validarComando(mensaje){
    let isCommand = false;

    if(mensaje == 'cmd-mensajes'){
        isCommand = true
        let cantidadMensajes = 80; // TODO hardcodeado
        let respuesta = "cantidad de mensajes : "+cantidadMensajes;
        return [isCommand, respuesta]

    } else if(mensaje == 'cmd-usuarios-c'){
        isCommand = true
        let respuesta = "cantidad de usuarios conectados "+cantidadClientesConectados;
        return [isCommand, respuesta]

    } else if(mensaje.startsWith('cmd-')){
        isCommand = true
        let palabra = mensaje.substr(4);
        let cantidadMensajes = 20; // TODO hardcodeado
        let respuesta = "cantidad de mensajes con "+palabra+": "+cantidadMensajes;
        return [isCommand, respuesta]
    } else{
        return [isCommand, '']
    }
}